import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly Course: "Course";
    readonly Lesson: "Lesson";
    readonly Enrollment: "Enrollment";
    readonly LessonProgress: "LessonProgress";
    readonly Exam: "Exam";
    readonly Question: "Question";
    readonly ExamResult: "ExamResult";
    readonly Flashcard: "Flashcard";
    readonly FlashcardProgress: "FlashcardProgress";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const CourseScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly level: "level";
    readonly price: "price";
    readonly thumbnail: "thumbnail";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum];
export declare const LessonScalarFieldEnum: {
    readonly id: "id";
    readonly courseId: "courseId";
    readonly title: "title";
    readonly videoUrl: "videoUrl";
    readonly content: "content";
    readonly order: "order";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum];
export declare const EnrollmentScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly courseId: "courseId";
    readonly progress: "progress";
    readonly enrolledAt: "enrolledAt";
    readonly updatedAt: "updatedAt";
};
export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum];
export declare const LessonProgressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly lessonId: "lessonId";
    readonly completed: "completed";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LessonProgressScalarFieldEnum = (typeof LessonProgressScalarFieldEnum)[keyof typeof LessonProgressScalarFieldEnum];
export declare const ExamScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly level: "level";
    readonly duration: "duration";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ExamScalarFieldEnum = (typeof ExamScalarFieldEnum)[keyof typeof ExamScalarFieldEnum];
export declare const QuestionScalarFieldEnum: {
    readonly id: "id";
    readonly examId: "examId";
    readonly question: "question";
    readonly options: "options";
    readonly correctAnswer: "correctAnswer";
    readonly explanation: "explanation";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum];
export declare const ExamResultScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly examId: "examId";
    readonly score: "score";
    readonly correctCount: "correctCount";
    readonly timeSpent: "timeSpent";
    readonly submittedAt: "submittedAt";
};
export type ExamResultScalarFieldEnum = (typeof ExamResultScalarFieldEnum)[keyof typeof ExamResultScalarFieldEnum];
export declare const FlashcardScalarFieldEnum: {
    readonly id: "id";
    readonly word: "word";
    readonly kana: "kana";
    readonly meaning: "meaning";
    readonly example: "example";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FlashcardScalarFieldEnum = (typeof FlashcardScalarFieldEnum)[keyof typeof FlashcardScalarFieldEnum];
export declare const FlashcardProgressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly flashcardId: "flashcardId";
    readonly known: "known";
    readonly reviewCount: "reviewCount";
    readonly lastReviewedAt: "lastReviewedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FlashcardProgressScalarFieldEnum = (typeof FlashcardProgressScalarFieldEnum)[keyof typeof FlashcardProgressScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly totalPrice: "totalPrice";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly courseId: "courseId";
    readonly price: "price";
    readonly createdAt: "createdAt";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
