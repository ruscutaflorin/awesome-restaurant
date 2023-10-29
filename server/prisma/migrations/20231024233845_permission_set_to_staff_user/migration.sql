/*
  Warnings:

  - You are about to drop the `_PermissionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PermissionToUser" DROP CONSTRAINT "_PermissionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUser" DROP CONSTRAINT "_PermissionToUser_B_fkey";

-- AlterTable
ALTER TABLE "StaffUser" ADD COLUMN     "permissionId" INTEGER;

-- DropTable
DROP TABLE "_PermissionToUser";

-- AddForeignKey
ALTER TABLE "StaffUser" ADD CONSTRAINT "StaffUser_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
