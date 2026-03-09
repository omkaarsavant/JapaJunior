CREATE TABLE `characterCache` (
	`id` int AUTO_INCREMENT NOT NULL,
	`character` varchar(10) NOT NULL,
	`romaji` varchar(100) NOT NULL,
	`characterType` enum('hiragana','katakana','kanji') NOT NULL,
	`meanings` text,
	`strokeCount` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `characterCache_id` PRIMARY KEY(`id`),
	CONSTRAINT `characterCache_character_unique` UNIQUE(`character`)
);
--> statement-breakpoint
CREATE TABLE `wordHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`word` varchar(255) NOT NULL,
	`romaji` varchar(255) NOT NULL,
	`translation` text,
	`wordType` enum('hiragana','katakana','kanji','mixed') NOT NULL,
	`characters` text NOT NULL,
	`confidence` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `wordHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `wordHistory` ADD CONSTRAINT `wordHistory_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;