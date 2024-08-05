CREATE TABLE IF NOT EXISTS "productReference" (
	"stripeProductId" text NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"username" text NOT NULL,
	"hashed_password" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
