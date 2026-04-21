import { action } from "./_generated/server";
import { v } from "convex/values";
import Anthropic from "@anthropic-ai/sdk";

export const generateText = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    // You must set the ANTHROPIC_API_KEY environment variable in your Convex dashboard
    // to use the "claude paid api".
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set in environment variables");
    }

    const anthropic = new Anthropic({
      apiKey,
    });

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-opus-20240229", // Use claude-3-opus or claude-3-sonnet or claude-3-haiku
        max_tokens: 1024,
        messages: [{ role: "user", content: args.prompt }],
      });

      const block = response.content[0];
      return block.type === "text" ? block.text : "";
    } catch (error) {
      console.error("Error calling Claude API:", error);
      throw new Error("Failed to generate response from Claude");
    }
  },
});
