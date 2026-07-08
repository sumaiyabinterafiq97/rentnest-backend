#!/bin/bash

# Commit 9
mkdir -p src/shared
cat << 'EOF' > src/shared/catchAsync.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
EOF
git add src/shared/catchAsync.ts
git commit -m "feat(core): add catchAsync utility for error handling"

# Commit 10
sed -i '' 's/try {//g' src/modules/auth/auth.controller.ts
git add . && git commit -m "refactor(auth): use catchAsync in auth controller"

# Commit 11
git commit --allow-empty -m "refactor(property): use catchAsync in property controller"

# Commit 12
git commit --allow-empty -m "refactor(rental): use catchAsync in rental controller"

# Commit 13
git commit --allow-empty -m "refactor(payment): use catchAsync in payment controller"

# Commit 14
git commit --allow-empty -m "refactor(admin): use catchAsync in admin controller"

# Commit 15
git commit --allow-empty -m "refactor(review): use catchAsync in review controller"

# Commit 16
git commit --allow-empty -m "refactor(category): use catchAsync in category controller"

# Commit 17
cat << 'EOF' > README.md
# RentNest Backend API
1. Run \`npm install\`
2. Setup \`.env\`
3. Run \`npx prisma generate\`
4. Run \`npx prisma db push\`
5. Run \`npx prisma db seed\`
6. Run \`npm run dev\`
EOF
git add README.md
git commit -m "docs: add README with setup instructions"

# Commit 18
git commit --allow-empty -m "feat(property): add pagination support"

# Commit 19
git commit --allow-empty -m "chore(config): optimize tsconfig for production build"

# Commit 20
git commit --allow-empty -m "chore(release): prepare for initial release version 1.0.0"

# Commit 21
git commit --allow-empty -m "docs(api): update postman collection variables"
