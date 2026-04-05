import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    role: $Enums.UserRole | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    role: $Enums.UserRole | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    name: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    password: string;
    name: string | null;
    role: $Enums.UserRole;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    enrollments?: Prisma.EnrollmentListRelationFilter;
    examResults?: Prisma.ExamResultListRelationFilter;
    flashcardProgress?: Prisma.FlashcardProgressListRelationFilter;
    lessonProgress?: Prisma.LessonProgressListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    enrollments?: Prisma.EnrollmentOrderByRelationAggregateInput;
    examResults?: Prisma.ExamResultOrderByRelationAggregateInput;
    flashcardProgress?: Prisma.FlashcardProgressOrderByRelationAggregateInput;
    lessonProgress?: Prisma.LessonProgressOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    enrollments?: Prisma.EnrollmentListRelationFilter;
    examResults?: Prisma.ExamResultListRelationFilter;
    flashcardProgress?: Prisma.FlashcardProgressListRelationFilter;
    lessonProgress?: Prisma.LessonProgressListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    examResults?: Prisma.ExamResultCreateNestedManyWithoutUserInput;
    flashcardProgress?: Prisma.FlashcardProgressCreateNestedManyWithoutUserInput;
    lessonProgress?: Prisma.LessonProgressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    examResults?: Prisma.ExamResultUncheckedCreateNestedManyWithoutUserInput;
    flashcardProgress?: Prisma.FlashcardProgressUncheckedCreateNestedManyWithoutUserInput;
    lessonProgress?: Prisma.LessonProgressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    examResults?: Prisma.ExamResultUpdateManyWithoutUserNestedInput;
    flashcardProgress?: Prisma.FlashcardProgressUpdateManyWithoutUserNestedInput;
    lessonProgress?: Prisma.LessonProgressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    examResults?: Prisma.ExamResultUncheckedUpdateManyWithoutUserNestedInput;
    flashcardProgress?: Prisma.FlashcardProgressUncheckedUpdateManyWithoutUserNestedInput;
    lessonProgress?: Prisma.LessonProgressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutEnrollmentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEnrollmentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEnrollmentsInput;
    upsert?: Prisma.UserUpsertWithoutEnrollmentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEnrollmentsInput, Prisma.UserUpdateWithoutEnrollmentsInput>, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
};
export type UserCreateNestedOneWithoutLessonProgressInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLessonProgressInput, Prisma.UserUncheckedCreateWithoutLessonProgressInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLessonProgressInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutLessonProgressNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLessonProgressInput, Prisma.UserUncheckedCreateWithoutLessonProgressInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLessonProgressInput;
    upsert?: Prisma.UserUpsertWithoutLessonProgressInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutLessonProgressInput, Prisma.UserUpdateWithoutLessonProgressInput>, Prisma.UserUncheckedUpdateWithoutLessonProgressInput>;
};
export type UserCreateNestedOneWithoutExamResultsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExamResultsInput, Prisma.UserUncheckedCreateWithoutExamResultsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExamResultsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutExamResultsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExamResultsInput, Prisma.UserUncheckedCreateWithoutExamResultsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExamResultsInput;
    upsert?: Prisma.UserUpsertWithoutExamResultsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutExamResultsInput, Prisma.UserUpdateWithoutExamResultsInput>, Prisma.UserUncheckedUpdateWithoutExamResultsInput>;
};
export type UserCreateNestedOneWithoutFlashcardProgressInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFlashcardProgressInput, Prisma.UserUncheckedCreateWithoutFlashcardProgressInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFlashcardProgressInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutFlashcardProgressNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFlashcardProgressInput, Prisma.UserUncheckedCreateWithoutFlashcardProgressInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFlashcardProgressInput;
    upsert?: Prisma.UserUpsertWithoutFlashcardProgressInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutFlashcardProgressInput, Prisma.UserUpdateWithoutFlashcardProgressInput>, Prisma.UserUncheckedUpdateWithoutFlashcardProgressInput>;
};
export type UserCreateWithoutEnrollmentsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    examResults?: Prisma.ExamResultCreateNestedManyWithoutUserInput;
    flashcardProgress?: Prisma.FlashcardProgressCreateNestedManyWithoutUserInput;
    lessonProgress?: Prisma.LessonProgressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutEnrollmentsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    examResults?: Prisma.ExamResultUncheckedCreateNestedManyWithoutUserInput;
    flashcardProgress?: Prisma.FlashcardProgressUncheckedCreateNestedManyWithoutUserInput;
    lessonProgress?: Prisma.LessonProgressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutEnrollmentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
};
export type UserUpsertWithoutEnrollmentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEnrollmentsInput, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEnrollmentsInput, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
};
export type UserUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examResults?: Prisma.ExamResultUpdateManyWithoutUserNestedInput;
    flashcardProgress?: Prisma.FlashcardProgressUpdateManyWithoutUserNestedInput;
    lessonProgress?: Prisma.LessonProgressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    examResults?: Prisma.ExamResultUncheckedUpdateManyWithoutUserNestedInput;
    flashcardProgress?: Prisma.FlashcardProgressUncheckedUpdateManyWithoutUserNestedInput;
    lessonProgress?: Prisma.LessonProgressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutLessonProgressInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    examResults?: Prisma.ExamResultCreateNestedManyWithoutUserInput;
    flashcardProgress?: Prisma.FlashcardProgressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutLessonProgressInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    examResults?: Prisma.ExamResultUncheckedCreateNestedManyWithoutUserInput;
    flashcardProgress?: Prisma.FlashcardProgressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutLessonProgressInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutLessonProgressInput, Prisma.UserUncheckedCreateWithoutLessonProgressInput>;
};
export type UserUpsertWithoutLessonProgressInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutLessonProgressInput, Prisma.UserUncheckedUpdateWithoutLessonProgressInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutLessonProgressInput, Prisma.UserUncheckedCreateWithoutLessonProgressInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutLessonProgressInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutLessonProgressInput, Prisma.UserUncheckedUpdateWithoutLessonProgressInput>;
};
export type UserUpdateWithoutLessonProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    examResults?: Prisma.ExamResultUpdateManyWithoutUserNestedInput;
    flashcardProgress?: Prisma.FlashcardProgressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutLessonProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    examResults?: Prisma.ExamResultUncheckedUpdateManyWithoutUserNestedInput;
    flashcardProgress?: Prisma.FlashcardProgressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutExamResultsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    flashcardProgress?: Prisma.FlashcardProgressCreateNestedManyWithoutUserInput;
    lessonProgress?: Prisma.LessonProgressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutExamResultsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    flashcardProgress?: Prisma.FlashcardProgressUncheckedCreateNestedManyWithoutUserInput;
    lessonProgress?: Prisma.LessonProgressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutExamResultsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutExamResultsInput, Prisma.UserUncheckedCreateWithoutExamResultsInput>;
};
export type UserUpsertWithoutExamResultsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutExamResultsInput, Prisma.UserUncheckedUpdateWithoutExamResultsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutExamResultsInput, Prisma.UserUncheckedCreateWithoutExamResultsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutExamResultsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutExamResultsInput, Prisma.UserUncheckedUpdateWithoutExamResultsInput>;
};
export type UserUpdateWithoutExamResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    flashcardProgress?: Prisma.FlashcardProgressUpdateManyWithoutUserNestedInput;
    lessonProgress?: Prisma.LessonProgressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutExamResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    flashcardProgress?: Prisma.FlashcardProgressUncheckedUpdateManyWithoutUserNestedInput;
    lessonProgress?: Prisma.LessonProgressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutFlashcardProgressInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    examResults?: Prisma.ExamResultCreateNestedManyWithoutUserInput;
    lessonProgress?: Prisma.LessonProgressCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutFlashcardProgressInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    role?: $Enums.UserRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    examResults?: Prisma.ExamResultUncheckedCreateNestedManyWithoutUserInput;
    lessonProgress?: Prisma.LessonProgressUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutFlashcardProgressInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutFlashcardProgressInput, Prisma.UserUncheckedCreateWithoutFlashcardProgressInput>;
};
export type UserUpsertWithoutFlashcardProgressInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutFlashcardProgressInput, Prisma.UserUncheckedUpdateWithoutFlashcardProgressInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutFlashcardProgressInput, Prisma.UserUncheckedCreateWithoutFlashcardProgressInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutFlashcardProgressInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutFlashcardProgressInput, Prisma.UserUncheckedUpdateWithoutFlashcardProgressInput>;
};
export type UserUpdateWithoutFlashcardProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    examResults?: Prisma.ExamResultUpdateManyWithoutUserNestedInput;
    lessonProgress?: Prisma.LessonProgressUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutFlashcardProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    examResults?: Prisma.ExamResultUncheckedUpdateManyWithoutUserNestedInput;
    lessonProgress?: Prisma.LessonProgressUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    enrollments: number;
    examResults: number;
    flashcardProgress: number;
    lessonProgress: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    enrollments?: boolean | UserCountOutputTypeCountEnrollmentsArgs;
    examResults?: boolean | UserCountOutputTypeCountExamResultsArgs;
    flashcardProgress?: boolean | UserCountOutputTypeCountFlashcardProgressArgs;
    lessonProgress?: boolean | UserCountOutputTypeCountLessonProgressArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountEnrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EnrollmentWhereInput;
};
export type UserCountOutputTypeCountExamResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamResultWhereInput;
};
export type UserCountOutputTypeCountFlashcardProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlashcardProgressWhereInput;
};
export type UserCountOutputTypeCountLessonProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonProgressWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    enrollments?: boolean | Prisma.User$enrollmentsArgs<ExtArgs>;
    examResults?: boolean | Prisma.User$examResultsArgs<ExtArgs>;
    flashcardProgress?: boolean | Prisma.User$flashcardProgressArgs<ExtArgs>;
    lessonProgress?: boolean | Prisma.User$lessonProgressArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    enrollments?: boolean | Prisma.User$enrollmentsArgs<ExtArgs>;
    examResults?: boolean | Prisma.User$examResultsArgs<ExtArgs>;
    flashcardProgress?: boolean | Prisma.User$flashcardProgressArgs<ExtArgs>;
    lessonProgress?: boolean | Prisma.User$lessonProgressArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        enrollments: Prisma.$EnrollmentPayload<ExtArgs>[];
        examResults: Prisma.$ExamResultPayload<ExtArgs>[];
        flashcardProgress: Prisma.$FlashcardProgressPayload<ExtArgs>[];
        lessonProgress: Prisma.$LessonProgressPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: $Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    enrollments<T extends Prisma.User$enrollmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    examResults<T extends Prisma.User$examResultsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$examResultsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    flashcardProgress<T extends Prisma.User$flashcardProgressArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$flashcardProgressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    lessonProgress<T extends Prisma.User$lessonProgressArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$lessonProgressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$enrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.EnrollmentOmit<ExtArgs> | null;
    include?: Prisma.EnrollmentInclude<ExtArgs> | null;
    where?: Prisma.EnrollmentWhereInput;
    orderBy?: Prisma.EnrollmentOrderByWithRelationInput | Prisma.EnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.EnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EnrollmentScalarFieldEnum | Prisma.EnrollmentScalarFieldEnum[];
};
export type User$examResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    where?: Prisma.ExamResultWhereInput;
    orderBy?: Prisma.ExamResultOrderByWithRelationInput | Prisma.ExamResultOrderByWithRelationInput[];
    cursor?: Prisma.ExamResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamResultScalarFieldEnum | Prisma.ExamResultScalarFieldEnum[];
};
export type User$flashcardProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    include?: Prisma.FlashcardProgressInclude<ExtArgs> | null;
    where?: Prisma.FlashcardProgressWhereInput;
    orderBy?: Prisma.FlashcardProgressOrderByWithRelationInput | Prisma.FlashcardProgressOrderByWithRelationInput[];
    cursor?: Prisma.FlashcardProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlashcardProgressScalarFieldEnum | Prisma.FlashcardProgressScalarFieldEnum[];
};
export type User$lessonProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonProgressSelect<ExtArgs> | null;
    omit?: Prisma.LessonProgressOmit<ExtArgs> | null;
    include?: Prisma.LessonProgressInclude<ExtArgs> | null;
    where?: Prisma.LessonProgressWhereInput;
    orderBy?: Prisma.LessonProgressOrderByWithRelationInput | Prisma.LessonProgressOrderByWithRelationInput[];
    cursor?: Prisma.LessonProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonProgressScalarFieldEnum | Prisma.LessonProgressScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
