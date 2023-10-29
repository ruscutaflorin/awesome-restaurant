"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var i, user, permission, restaurant, diningTable, order, category, product, reservation, review, staffUser, payment, orderItem, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 16, 17, 19]);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 100)) return [3 /*break*/, 15];
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: "User ".concat(i),
                                email: "user".concat(i, "_").concat(Date.now(), "@example.com"),
                                password: "password123", // Change this to a secure password hashing method
                            },
                        })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, prisma.permission.create({
                            data: {
                                name: "Permission ".concat(i),
                                code: "permission_".concat(i),
                            },
                        })];
                case 3:
                    permission = _a.sent();
                    return [4 /*yield*/, prisma.restaurant.create({
                            data: {
                                name: "Restaurant ".concat(i),
                                address: "Address ".concat(i),
                                location: "Location ".concat(i),
                                businessHours: ["9 AM - 5 PM"],
                                ownerId: user.id,
                            },
                        })];
                case 4:
                    restaurant = _a.sent();
                    return [4 /*yield*/, prisma.diningTable.create({
                            data: {
                                name: "Dining Table ".concat(i),
                                status: "Available",
                                capacity: Math.floor(Math.random() * 10) + 2,
                                positionX: Math.floor(Math.random() * 100),
                                positionY: Math.floor(Math.random() * 100),
                                restaurantId: restaurant.id,
                            },
                        })];
                case 5:
                    diningTable = _a.sent();
                    return [4 /*yield*/, prisma.order.create({
                            data: {
                                status: "Pending",
                                orderDate: new Date(),
                                totalAmount: Math.floor(Math.random() * 100) + 10,
                                tableId: diningTable.id,
                                userId: user.id,
                            },
                        })];
                case 6:
                    order = _a.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                name: "Category ".concat(i),
                                restaurantId: restaurant.id,
                            },
                        })];
                case 7:
                    category = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                name: "Product ".concat(i),
                                description: "Description ".concat(i),
                                price: Math.floor(Math.random() * 50) + 5,
                                basePrice: Math.floor(Math.random() * 40) + 5,
                                ingredients: ["Ingredient1", "Ingredient2"],
                                availability: true,
                                categoryId: category.id,
                            },
                        })];
                case 8:
                    product = _a.sent();
                    return [4 /*yield*/, prisma.reservation.create({
                            data: {
                                restaurantId: restaurant.id,
                                tableId: diningTable.id,
                                reservationDate: new Date(),
                                numberOfGuests: Math.floor(Math.random() * 10) + 2,
                                customerName: "Customer ".concat(i),
                                customerPhone: "Phone ".concat(i),
                                reservationStatus: "Pending",
                            },
                        })];
                case 9:
                    reservation = _a.sent();
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                restaurantId: restaurant.id,
                                userId: user.id,
                                rating: Math.floor(Math.random() * 5) + 1,
                                reviewText: "Review Text ".concat(i),
                                productId: product.id,
                            },
                        })];
                case 10:
                    review = _a.sent();
                    return [4 /*yield*/, prisma.staffUser.create({
                            data: {
                                name: "Staff User ".concat(i),
                                role: "Waiter",
                                userId: user.id,
                                restaurantId: restaurant.id,
                            },
                        })];
                case 11:
                    staffUser = _a.sent();
                    return [4 /*yield*/, prisma.payment.create({
                            data: {
                                status: "Completed",
                                method: "Credit Card",
                                transactionID: "TransactionID ".concat(i),
                                orderId: order.id,
                            },
                        })];
                case 12:
                    payment = _a.sent();
                    return [4 /*yield*/, prisma.orderItem.create({
                            data: {
                                orderId: order.id,
                                productId: product.id,
                                quantity: Math.floor(Math.random() * 5) + 1,
                                diningTableId: diningTable.id,
                            },
                        })];
                case 13:
                    orderItem = _a.sent();
                    _a.label = 14;
                case 14:
                    i++;
                    return [3 /*break*/, 1];
                case 15:
                    console.log("100 test values inserted successfully.");
                    return [3 /*break*/, 19];
                case 16:
                    error_1 = _a.sent();
                    console.error("Error seeding the database:", error_1);
                    return [3 /*break*/, 19];
                case 17: return [4 /*yield*/, prisma.$disconnect()];
                case 18:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 19: return [2 /*return*/];
            }
        });
    });
}
seedDatabase();
