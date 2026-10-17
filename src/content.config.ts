import { glob, file } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const images = defineCollection({
	// Load Markdown and MDX files in the `src/content/images/` directory.
	loader: glob({ base: "./src/content/images", pattern: "**/*.{jpg}" }),
});

const illustrations = defineCollection({
	loader: file('src/data/illustrations.json'),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		polishTitle: z.string(),
		date: z.coerce.date(),
		link: z.string().optional(),
		originalAvailable: z.boolean().optional(),
		printAvailable: z.boolean().optional(),
		digitalAvailable: z.boolean().optional(),
		format: z.enum(['A5', 'B5', '15x30cm, 30x30cm', 'A4', 'A3', 'other']).optional(),
		digitalResolution: z.enum(['300dpi', '600dpi', '1200dpi']).optional(),
	}),
});
export const collections = { blog, images, illustrations };
