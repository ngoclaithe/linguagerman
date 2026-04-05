import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LessonModel = runtime.Types.Result.DefaultSelection<Prisma.$LessonPayload>;
export type AggregateLesson = {
    _count: LessonCountAggregateOutputType | null;
    _avg: LessonAvgAggregateOutputType | null;
    _sum: LessonSumAggregateOutputType | null;
    _min: LessonMinAggregateOutputType | null;
    _max: LessonMaxAggregateOutputType | null;
};
export type LessonAvgAggregateOutputType = {
    order: number | null;
};
export type LessonSumAggregateOutputType = {
    order: number | null;
};
export type LessonMinAggregateOutputType = {
    id: string | null;
    courseId: string | null;
    title: string | null;
    videoUrl: string | null;
    content: string | null;
    order: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LessonMaxAggregateOutputType = {
    id: string | null;
    courseId: string | null;
    title: string | null;
    videoUrl: string | null;
    content: string | null;
    order: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LessonCountAggregateOutputType = {
    id: number;
    courseId: number;
    title: number;
    videoUrl: number;
    content: number;
    order: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LessonAvgAggregateInputType = {
    order?: true;
};
export type LessonSumAggregateInputType = {
    order?: true;
};
export type LessonMinAggregateInputType = {
    id?: true;
    courseId?: true;
    title?: true;
    videoUrl?: true;
    content?: true;
    order?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LessonMaxAggregateInputType = {
    id?: true;
    courseId?: true;
    title?: true;
    videoUrl?: true;
    content?: true;
    order?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LessonCountAggregateInputType = {
    id?: true;
    courseId?: true;
    title?: true;
    videoUrl?: true;
    content?: true;
    order?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LessonAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LessonCountAggregateInputType;
    _avg?: LessonAvgAggregateInputType;
    _sum?: LessonSumAggregateInputType;
    _min?: LessonMinAggregateInputType;
    _max?: LessonMaxAggregateInputType;
};
export type GetLessonAggregateType<T extends LessonAggregateArgs> = {
    [P in keyof T & keyof AggregateLesson]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLesson[P]> : Prisma.GetScalarType<T[P], AggregateLesson[P]>;
};
export type LessonGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithAggregationInput | Prisma.LessonOrderByWithAggregationInput[];
    by: Prisma.LessonScalarFieldEnum[] | Prisma.LessonScalarFieldEnum;
    having?: Prisma.LessonScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LessonCountAggregateInputType | true;
    _avg?: LessonAvgAggregateInputType;
    _sum?: LessonSumAggregateInputType;
    _min?: LessonMinAggregateInputType;
    _max?: LessonMaxAggregateInputType;
};
export type LessonGroupByOutputType = {
    id: string;
    courseId: string;
    title: string;
    videoUrl: string | null;
    content: string | null;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    _count: LessonCountAggregateOutputType | null;
    _avg: LessonAvgAggregateOutputType | null;
    _sum: LessonSumAggregateOutputType | null;
    _min: LessonMinAggregateOutputType | null;
    _max: LessonMaxAggregateOutputType | null;
};
type GetLessonGroupByPayload<T extends LessonGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LessonGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LessonGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LessonGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LessonGroupByOutputType[P]>;
}>>;
export type LessonWhereInput = {
    AND?: Prisma.LessonWhereInput | Prisma.LessonWhereInput[];
    OR?: Prisma.LessonWhereInput[];
    NOT?: Prisma.LessonWhereInput | Prisma.LessonWhereInput[];
    id?: Prisma.StringFilter<"Lesson"> | string;
    courseId?: Prisma.StringFilter<"Lesson"> | string;
    title?: Prisma.StringFilter<"Lesson"> | string;
    videoUrl?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    content?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    order?: Prisma.IntFilter<"Lesson"> | number;
    createdAt?: Prisma.DateTimeFilter<"Lesson"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Lesson"> | Date | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    lessonProgress?: Prisma.LessonProgressListRelationFilter;
};
export type LessonOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    course?: Prisma.CourseOrderByWithRelationInput;
    lessonProgress?: Prisma.LessonProgressOrderByRelationAggregateInput;
};
export type LessonWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.LessonWhereInput | Prisma.LessonWhereInput[];
    OR?: Prisma.LessonWhereInput[];
    NOT?: Prisma.LessonWhereInput | Prisma.LessonWhereInput[];
    courseId?: Prisma.StringFilter<"Lesson"> | string;
    title?: Prisma.StringFilter<"Lesson"> | string;
    videoUrl?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    content?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    order?: Prisma.IntFilter<"Lesson"> | number;
    createdAt?: Prisma.DateTimeFilter<"Lesson"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Lesson"> | Date | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    lessonProgress?: Prisma.LessonProgressListRelationFilter;
}, "id">;
export type LessonOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LessonCountOrderByAggregateInput;
    _avg?: Prisma.LessonAvgOrderByAggregateInput;
    _max?: Prisma.LessonMaxOrderByAggregateInput;
    _min?: Prisma.LessonMinOrderByAggregateInput;
    _sum?: Prisma.LessonSumOrderByAggregateInput;
};
export type LessonScalarWhereWithAggregatesInput = {
    AND?: Prisma.LessonScalarWhereWithAggregatesInput | Prisma.LessonScalarWhereWithAggregatesInput[];
    OR?: Prisma.LessonScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LessonScalarWhereWithAggregatesInput | Prisma.LessonScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Lesson"> | string;
    courseId?: Prisma.StringWithAggregatesFilter<"Lesson"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Lesson"> | string;
    videoUrl?: Prisma.StringNullableWithAggregatesFilter<"Lesson"> | string | null;
    content?: Prisma.StringNullableWithAggregatesFilter<"Lesson"> | string | null;
    order?: Prisma.IntWithAggregatesFilter<"Lesson"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Lesson"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Lesson"> | Date | string;
};
export type LessonCreateInput = {
    id?: string;
    title: string;
    videoUrl?: string | null;
    content?: string | null;
    order: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutLessonsInput;
    lessonProgress?: Prisma.LessonProgressCreateNestedManyWithoutLessonInput;
};
export type LessonUncheckedCreateInput = {
    id?: string;
    courseId: string;
    title: string;
    videoUrl?: string | null;
    content?: string | null;
    order: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessonProgress?: Prisma.LessonProgressUncheckedCreateNestedManyWithoutLessonInput;
};
export type LessonUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutLessonsNestedInput;
    lessonProgress?: Prisma.LessonProgressUpdateManyWithoutLessonNestedInput;
};
export type LessonUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessonProgress?: Prisma.LessonProgressUncheckedUpdateManyWithoutLessonNestedInput;
};
export type LessonCreateManyInput = {
    id?: string;
    courseId: string;
    title: string;
    videoUrl?: string | null;
    content?: string | null;
    order: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LessonUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonListRelationFilter = {
    every?: Prisma.LessonWhereInput;
    some?: Prisma.LessonWhereInput;
    none?: Prisma.LessonWhereInput;
};
export type LessonOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LessonCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LessonAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type LessonMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LessonMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LessonSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type LessonScalarRelationFilter = {
    is?: Prisma.LessonWhereInput;
    isNot?: Prisma.LessonWhereInput;
};
export type LessonCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutCourseInput, Prisma.LessonUncheckedCreateWithoutCourseInput> | Prisma.LessonCreateWithoutCourseInput[] | Prisma.LessonUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutCourseInput | Prisma.LessonCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.LessonCreateManyCourseInputEnvelope;
    connect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
};
export type LessonUncheckedCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutCourseInput, Prisma.LessonUncheckedCreateWithoutCourseInput> | Prisma.LessonCreateWithoutCourseInput[] | Prisma.LessonUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutCourseInput | Prisma.LessonCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.LessonCreateManyCourseInputEnvelope;
    connect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
};
export type LessonUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutCourseInput, Prisma.LessonUncheckedCreateWithoutCourseInput> | Prisma.LessonCreateWithoutCourseInput[] | Prisma.LessonUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutCourseInput | Prisma.LessonCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.LessonUpsertWithWhereUniqueWithoutCourseInput | Prisma.LessonUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.LessonCreateManyCourseInputEnvelope;
    set?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    disconnect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    delete?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    connect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    update?: Prisma.LessonUpdateWithWhereUniqueWithoutCourseInput | Prisma.LessonUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.LessonUpdateManyWithWhereWithoutCourseInput | Prisma.LessonUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.LessonScalarWhereInput | Prisma.LessonScalarWhereInput[];
};
export type LessonUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutCourseInput, Prisma.LessonUncheckedCreateWithoutCourseInput> | Prisma.LessonCreateWithoutCourseInput[] | Prisma.LessonUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutCourseInput | Prisma.LessonCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.LessonUpsertWithWhereUniqueWithoutCourseInput | Prisma.LessonUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.LessonCreateManyCourseInputEnvelope;
    set?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    disconnect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    delete?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    connect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    update?: Prisma.LessonUpdateWithWhereUniqueWithoutCourseInput | Prisma.LessonUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.LessonUpdateManyWithWhereWithoutCourseInput | Prisma.LessonUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.LessonScalarWhereInput | Prisma.LessonScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type LessonCreateNestedOneWithoutLessonProgressInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutLessonProgressInput, Prisma.LessonUncheckedCreateWithoutLessonProgressInput>;
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutLessonProgressInput;
    connect?: Prisma.LessonWhereUniqueInput;
};
export type LessonUpdateOneRequiredWithoutLessonProgressNestedInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutLessonProgressInput, Prisma.LessonUncheckedCreateWithoutLessonProgressInput>;
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutLessonProgressInput;
    upsert?: Prisma.LessonUpsertWithoutLessonProgressInput;
    connect?: Prisma.LessonWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LessonUpdateToOneWithWhereWithoutLessonProgressInput, Prisma.LessonUpdateWithoutLessonProgressInput>, Prisma.LessonUncheckedUpdateWithoutLessonProgressInput>;
};
export type LessonCreateWithoutCourseInput = {
    id?: string;
    title: string;
    videoUrl?: string | null;
    content?: string | null;
    order: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessonProgress?: Prisma.LessonProgressCreateNestedManyWithoutLessonInput;
};
export type LessonUncheckedCreateWithoutCourseInput = {
    id?: string;
    title: string;
    videoUrl?: string | null;
    content?: string | null;
    order: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessonProgress?: Prisma.LessonProgressUncheckedCreateNestedManyWithoutLessonInput;
};
export type LessonCreateOrConnectWithoutCourseInput = {
    where: Prisma.LessonWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonCreateWithoutCourseInput, Prisma.LessonUncheckedCreateWithoutCourseInput>;
};
export type LessonCreateManyCourseInputEnvelope = {
    data: Prisma.LessonCreateManyCourseInput | Prisma.LessonCreateManyCourseInput[];
    skipDuplicates?: boolean;
};
export type LessonUpsertWithWhereUniqueWithoutCourseInput = {
    where: Prisma.LessonWhereUniqueInput;
    update: Prisma.XOR<Prisma.LessonUpdateWithoutCourseInput, Prisma.LessonUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.LessonCreateWithoutCourseInput, Prisma.LessonUncheckedCreateWithoutCourseInput>;
};
export type LessonUpdateWithWhereUniqueWithoutCourseInput = {
    where: Prisma.LessonWhereUniqueInput;
    data: Prisma.XOR<Prisma.LessonUpdateWithoutCourseInput, Prisma.LessonUncheckedUpdateWithoutCourseInput>;
};
export type LessonUpdateManyWithWhereWithoutCourseInput = {
    where: Prisma.LessonScalarWhereInput;
    data: Prisma.XOR<Prisma.LessonUpdateManyMutationInput, Prisma.LessonUncheckedUpdateManyWithoutCourseInput>;
};
export type LessonScalarWhereInput = {
    AND?: Prisma.LessonScalarWhereInput | Prisma.LessonScalarWhereInput[];
    OR?: Prisma.LessonScalarWhereInput[];
    NOT?: Prisma.LessonScalarWhereInput | Prisma.LessonScalarWhereInput[];
    id?: Prisma.StringFilter<"Lesson"> | string;
    courseId?: Prisma.StringFilter<"Lesson"> | string;
    title?: Prisma.StringFilter<"Lesson"> | string;
    videoUrl?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    content?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    order?: Prisma.IntFilter<"Lesson"> | number;
    createdAt?: Prisma.DateTimeFilter<"Lesson"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Lesson"> | Date | string;
};
export type LessonCreateWithoutLessonProgressInput = {
    id?: string;
    title: string;
    videoUrl?: string | null;
    content?: string | null;
    order: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutLessonsInput;
};
export type LessonUncheckedCreateWithoutLessonProgressInput = {
    id?: string;
    courseId: string;
    title: string;
    videoUrl?: string | null;
    content?: string | null;
    order: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LessonCreateOrConnectWithoutLessonProgressInput = {
    where: Prisma.LessonWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonCreateWithoutLessonProgressInput, Prisma.LessonUncheckedCreateWithoutLessonProgressInput>;
};
export type LessonUpsertWithoutLessonProgressInput = {
    update: Prisma.XOR<Prisma.LessonUpdateWithoutLessonProgressInput, Prisma.LessonUncheckedUpdateWithoutLessonProgressInput>;
    create: Prisma.XOR<Prisma.LessonCreateWithoutLessonProgressInput, Prisma.LessonUncheckedCreateWithoutLessonProgressInput>;
    where?: Prisma.LessonWhereInput;
};
export type LessonUpdateToOneWithWhereWithoutLessonProgressInput = {
    where?: Prisma.LessonWhereInput;
    data: Prisma.XOR<Prisma.LessonUpdateWithoutLessonProgressInput, Prisma.LessonUncheckedUpdateWithoutLessonProgressInput>;
};
export type LessonUpdateWithoutLessonProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutLessonsNestedInput;
};
export type LessonUncheckedUpdateWithoutLessonProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonCreateManyCourseInput = {
    id?: string;
    title: string;
    videoUrl?: string | null;
    content?: string | null;
    order: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LessonUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessonProgress?: Prisma.LessonProgressUpdateManyWithoutLessonNestedInput;
};
export type LessonUncheckedUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessonProgress?: Prisma.LessonProgressUncheckedUpdateManyWithoutLessonNestedInput;
};
export type LessonUncheckedUpdateManyWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonCountOutputType = {
    lessonProgress: number;
};
export type LessonCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lessonProgress?: boolean | LessonCountOutputTypeCountLessonProgressArgs;
};
export type LessonCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonCountOutputTypeSelect<ExtArgs> | null;
};
export type LessonCountOutputTypeCountLessonProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonProgressWhereInput;
};
export type LessonSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    title?: boolean;
    videoUrl?: boolean;
    content?: boolean;
    order?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    lessonProgress?: boolean | Prisma.Lesson$lessonProgressArgs<ExtArgs>;
    _count?: boolean | Prisma.LessonCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lesson"]>;
export type LessonSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    title?: boolean;
    videoUrl?: boolean;
    content?: boolean;
    order?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lesson"]>;
export type LessonSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    title?: boolean;
    videoUrl?: boolean;
    content?: boolean;
    order?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lesson"]>;
export type LessonSelectScalar = {
    id?: boolean;
    courseId?: boolean;
    title?: boolean;
    videoUrl?: boolean;
    content?: boolean;
    order?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LessonOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "courseId" | "title" | "videoUrl" | "content" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["lesson"]>;
export type LessonInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    lessonProgress?: boolean | Prisma.Lesson$lessonProgressArgs<ExtArgs>;
    _count?: boolean | Prisma.LessonCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LessonIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
};
export type LessonIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
};
export type $LessonPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Lesson";
    objects: {
        course: Prisma.$CoursePayload<ExtArgs>;
        lessonProgress: Prisma.$LessonProgressPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        courseId: string;
        title: string;
        videoUrl: string | null;
        content: string | null;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["lesson"]>;
    composites: {};
};
export type LessonGetPayload<S extends boolean | null | undefined | LessonDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LessonPayload, S>;
export type LessonCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LessonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LessonCountAggregateInputType | true;
};
export interface LessonDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Lesson'];
        meta: {
            name: 'Lesson';
        };
    };
    findUnique<T extends LessonFindUniqueArgs>(args: Prisma.SelectSubset<T, LessonFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LessonFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LessonFindFirstArgs>(args?: Prisma.SelectSubset<T, LessonFindFirstArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LessonFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LessonFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LessonFindManyArgs>(args?: Prisma.SelectSubset<T, LessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LessonCreateArgs>(args: Prisma.SelectSubset<T, LessonCreateArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LessonCreateManyArgs>(args?: Prisma.SelectSubset<T, LessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LessonCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LessonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LessonDeleteArgs>(args: Prisma.SelectSubset<T, LessonDeleteArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LessonUpdateArgs>(args: Prisma.SelectSubset<T, LessonUpdateArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LessonDeleteManyArgs>(args?: Prisma.SelectSubset<T, LessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LessonUpdateManyArgs>(args: Prisma.SelectSubset<T, LessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LessonUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LessonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LessonUpsertArgs>(args: Prisma.SelectSubset<T, LessonUpsertArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LessonCountArgs>(args?: Prisma.Subset<T, LessonCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LessonCountAggregateOutputType> : number>;
    aggregate<T extends LessonAggregateArgs>(args: Prisma.Subset<T, LessonAggregateArgs>): Prisma.PrismaPromise<GetLessonAggregateType<T>>;
    groupBy<T extends LessonGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LessonGroupByArgs['orderBy'];
    } : {
        orderBy?: LessonGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LessonFieldRefs;
}
export interface Prisma__LessonClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    course<T extends Prisma.CourseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CourseDefaultArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lessonProgress<T extends Prisma.Lesson$lessonProgressArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Lesson$lessonProgressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LessonFieldRefs {
    readonly id: Prisma.FieldRef<"Lesson", 'String'>;
    readonly courseId: Prisma.FieldRef<"Lesson", 'String'>;
    readonly title: Prisma.FieldRef<"Lesson", 'String'>;
    readonly videoUrl: Prisma.FieldRef<"Lesson", 'String'>;
    readonly content: Prisma.FieldRef<"Lesson", 'String'>;
    readonly order: Prisma.FieldRef<"Lesson", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Lesson", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Lesson", 'DateTime'>;
}
export type LessonFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where: Prisma.LessonWhereUniqueInput;
};
export type LessonFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where: Prisma.LessonWhereUniqueInput;
};
export type LessonFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonScalarFieldEnum | Prisma.LessonScalarFieldEnum[];
};
export type LessonFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonScalarFieldEnum | Prisma.LessonScalarFieldEnum[];
};
export type LessonFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonScalarFieldEnum | Prisma.LessonScalarFieldEnum[];
};
export type LessonCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonCreateInput, Prisma.LessonUncheckedCreateInput>;
};
export type LessonCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LessonCreateManyInput | Prisma.LessonCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LessonCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    data: Prisma.LessonCreateManyInput | Prisma.LessonCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LessonIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LessonUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonUpdateInput, Prisma.LessonUncheckedUpdateInput>;
    where: Prisma.LessonWhereUniqueInput;
};
export type LessonUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LessonUpdateManyMutationInput, Prisma.LessonUncheckedUpdateManyInput>;
    where?: Prisma.LessonWhereInput;
    limit?: number;
};
export type LessonUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonUpdateManyMutationInput, Prisma.LessonUncheckedUpdateManyInput>;
    where?: Prisma.LessonWhereInput;
    limit?: number;
    include?: Prisma.LessonIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LessonUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where: Prisma.LessonWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonCreateInput, Prisma.LessonUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LessonUpdateInput, Prisma.LessonUncheckedUpdateInput>;
};
export type LessonDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where: Prisma.LessonWhereUniqueInput;
};
export type LessonDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonWhereInput;
    limit?: number;
};
export type Lesson$lessonProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LessonDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
};
export {};
