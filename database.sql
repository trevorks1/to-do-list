--Create Table
CREATE TABLE "todo" (
  "id" serial primary key,
  "name" varchar(80),
  "task" varchar(30),
  "task_completion" boolean not null,
  "task_description" varchar(250)  
);

--Insert Into
INSERT INTO "todo" ("name", "task", "task_completion", "task_description")
VALUES ('Jerry', 'Clean Desk Top', TRUE, 'Clean out the inside of each desktop'),
('Susan', 'Install Software', TRUE, 'Install new software on each PC'),
('Megan', 'Update PC', TRUE, 'Update the new PCs with latest Updates'),
('Mahjor', 'Run Diagnostics', TRUE, 'Check if each PC is running smooth'),
('Carl', 'Connect to WiFi', TRUE, 'Connnect each PC to WiFi');