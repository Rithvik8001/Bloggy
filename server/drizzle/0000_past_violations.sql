CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT "user_name_length_check" CHECK(length("users"."user_name") >= 6 AND length("users"."user_name") <= 50)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);