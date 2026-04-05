"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.OrderItemScalarFieldEnum = exports.OrderScalarFieldEnum = exports.FlashcardProgressScalarFieldEnum = exports.FlashcardScalarFieldEnum = exports.ExamResultScalarFieldEnum = exports.QuestionScalarFieldEnum = exports.ExamScalarFieldEnum = exports.LessonProgressScalarFieldEnum = exports.EnrollmentScalarFieldEnum = exports.LessonScalarFieldEnum = exports.CourseScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull,
};
exports.DbNull = runtime.objectEnumValues.instances.DbNull;
exports.JsonNull = runtime.objectEnumValues.instances.JsonNull;
exports.AnyNull = runtime.objectEnumValues.instances.AnyNull;
exports.ModelName = {
    User: 'User',
    Course: 'Course',
    Lesson: 'Lesson',
    Enrollment: 'Enrollment',
    LessonProgress: 'LessonProgress',
    Exam: 'Exam',
    Question: 'Question',
    ExamResult: 'ExamResult',
    Flashcard: 'Flashcard',
    FlashcardProgress: 'FlashcardProgress',
    Order: 'Order',
    OrderItem: 'OrderItem'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CourseScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    level: 'level',
    price: 'price',
    thumbnail: 'thumbnail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.LessonScalarFieldEnum = {
    id: 'id',
    courseId: 'courseId',
    title: 'title',
    videoUrl: 'videoUrl',
    content: 'content',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EnrollmentScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    courseId: 'courseId',
    progress: 'progress',
    enrolledAt: 'enrolledAt',
    updatedAt: 'updatedAt'
};
exports.LessonProgressScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    lessonId: 'lessonId',
    completed: 'completed',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ExamScalarFieldEnum = {
    id: 'id',
    title: 'title',
    level: 'level',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.QuestionScalarFieldEnum = {
    id: 'id',
    examId: 'examId',
    question: 'question',
    options: 'options',
    correctAnswer: 'correctAnswer',
    explanation: 'explanation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ExamResultScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    examId: 'examId',
    score: 'score',
    correctCount: 'correctCount',
    timeSpent: 'timeSpent',
    submittedAt: 'submittedAt'
};
exports.FlashcardScalarFieldEnum = {
    id: 'id',
    word: 'word',
    kana: 'kana',
    meaning: 'meaning',
    example: 'example',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FlashcardProgressScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    flashcardId: 'flashcardId',
    known: 'known',
    reviewCount: 'reviewCount',
    lastReviewedAt: 'lastReviewedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrderScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    totalPrice: 'totalPrice',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrderItemScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    courseId: 'courseId',
    price: 'price',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map