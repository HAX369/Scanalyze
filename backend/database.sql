
-- Scanalyze Database Schema

CREATE TABLE "Users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" TEXT NOT NULL,
  "role" VARCHAR(20) DEFAULT 'user',
  "is_verified" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Documents" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID REFERENCES "Users"("id") ON DELETE CASCADE,
  "file_name" VARCHAR(255),
  "image_url" TEXT,
  "status" VARCHAR(50) DEFAULT 'pending',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "IngredientAnalysis" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "document_id" UUID REFERENCES "Documents"("id") ON DELETE CASCADE,
  "product_name" VARCHAR(255),
  "raw_text" TEXT,
  "safe_ingredients" JSONB,
  "harmful_ingredients" JSONB,
  "risk_score" DECIMAL(3, 1),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "AuditLogs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID REFERENCES "Users"("id"),
  "action" VARCHAR(100),
  "details" TEXT,
  "ip_address" VARCHAR(45),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
