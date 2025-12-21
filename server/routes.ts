import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactMessageSchema, teamRegistrationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);
      const savedMessage = await storage.saveContactMessage(validatedData);

      res.status(201).json({
        success: true,
        message: "Contact message received successfully",
        data: savedMessage
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });

  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = teamRegistrationSchema.parse(req.body);
      console.log("Registration request received:", {
        teamName: validatedData.teamName,
        college: validatedData.college,
        email: validatedData.email,
      });

      const result = await storage.saveTeamRegistration(validatedData);

      if (result.success) {
        res.status(201).json({
          success: true,
          message: result.message,
          data: validatedData
        });
      } else {
        console.error("Registration failed:", result.message);
        res.status(500).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error("Registration error:", error instanceof Error ? error.message : String(error));
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: error instanceof Error ? error.message : "An error occurred while processing your request"
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
