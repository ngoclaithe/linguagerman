import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExamResultModel = runtime.Types.Result.DefaultSelection<Prisma.$ExamResultPayload>;
export type AggregateExamResult = {
    _count: ExamResultCountAggregateOutputType | null;
    _avg: ExamResultAvgAggregateOutputType | null;
    _sum: ExamResultSumAggregateOutputType | null;
    _min: ExamResultMinAggregateOutputType | null;
    _max: ExamResultMaxAggregateOutputType | null;
};
export type ExamResultAvgAggregateOutputType = {
    score: number | null;
    correctCount: number | null;
    timeSpent: number | null;
};
export type ExamResultSumAggregateOutputType = {
    score: number | null;
    correctCount: number | null;
    timeSpent: number | null;
};
export type ExamResultMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    examId: string | null;
    score: number | null;
    correctCount: number | null;
    timeSpent: number | null;
    submittedAt: Date | null;
};
export type ExamResultMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    examId: string | null;
    score: number | null;
    correctCount: number | null;
    timeSpent: number | null;
    submittedAt: Date | null;
};
export type ExamResultCountAggregateOutputType = {
    id: number;
    userId: number;
    examId: number;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt: number;
    _all: number;
};
export type ExamResultAvgAggregateInputType = {
    score?: true;
    correctCount?: true;
    timeSpent?: true;
};
export type ExamResultSumAggregateInputType = {
    score?: true;
    correctCount?: true;
    timeSpent?: true;
};
export type ExamResultMinAggregateInputType = {
    id?: true;
    userId?: true;
    examId?: true;
    score?: true;
    correctCount?: true;
    timeSpent?: true;
    submittedAt?: true;
};
export type ExamResultMaxAggregateInputType = {
    id?: true;
    userId?: true;
    examId?: true;
    score?: true;
    correctCount?: true;
    timeSpent?: true;
    submittedAt?: true;
};
export type ExamResultCountAggregateInputType = {
    id?: true;
    userId?: true;
    examId?: true;
    score?: true;
    correctCount?: true;
    timeSpent?: true;
    submittedAt?: true;
    _all?: true;
};
export type ExamResultAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamResultWhereInput;
    orderBy?: Prisma.ExamResultOrderByWithRelationInput | Prisma.ExamResultOrderByWithRelationInput[];
    cursor?: Prisma.ExamResultWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExamResultCountAggregateInputType;
    _avg?: ExamResultAvgAggregateInputType;
    _sum?: ExamResultSumAggregateInputType;
    _min?: ExamResultMinAggregateInputType;
    _max?: ExamResultMaxAggregateInputType;
};
export type GetExamResultAggregateType<T extends ExamResultAggregateArgs> = {
    [P in keyof T & keyof AggregateExamResult]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExamResult[P]> : Prisma.GetScalarType<T[P], AggregateExamResult[P]>;
};
export type ExamResultGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamResultWhereInput;
    orderBy?: Prisma.ExamResultOrderByWithAggregationInput | Prisma.ExamResultOrderByWithAggregationInput[];
    by: Prisma.ExamResultScalarFieldEnum[] | Prisma.ExamResultScalarFieldEnum;
    having?: Prisma.ExamResultScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExamResultCountAggregateInputType | true;
    _avg?: ExamResultAvgAggregateInputType;
    _sum?: ExamResultSumAggregateInputType;
    _min?: ExamResultMinAggregateInputType;
    _max?: ExamResultMaxAggregateInputType;
};
export type ExamResultGroupByOutputType = {
    id: string;
    userId: string;
    examId: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt: Date;
    _count: ExamResultCountAggregateOutputType | null;
    _avg: ExamResultAvgAggregateOutputType | null;
    _sum: ExamResultSumAggregateOutputType | null;
    _min: ExamResultMinAggregateOutputType | null;
    _max: ExamResultMaxAggregateOutputType | null;
};
type GetExamResultGroupByPayload<T extends ExamResultGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExamResultGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExamResultGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExamResultGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExamResultGroupByOutputType[P]>;
}>>;
export type ExamResultWhereInput = {
    AND?: Prisma.ExamResultWhereInput | Prisma.ExamResultWhereInput[];
    OR?: Prisma.ExamResultWhereInput[];
    NOT?: Prisma.ExamResultWhereInput | Prisma.ExamResultWhereInput[];
    id?: Prisma.StringFilter<"ExamResult"> | string;
    userId?: Prisma.StringFilter<"ExamResult"> | string;
    examId?: Prisma.StringFilter<"ExamResult"> | string;
    score?: Prisma.FloatFilter<"ExamResult"> | number;
    correctCount?: Prisma.IntFilter<"ExamResult"> | number;
    timeSpent?: Prisma.IntFilter<"ExamResult"> | number;
    submittedAt?: Prisma.DateTimeFilter<"ExamResult"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    exam?: Prisma.XOR<Prisma.ExamScalarRelationFilter, Prisma.ExamWhereInput>;
};
export type ExamResultOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    correctCount?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    exam?: Prisma.ExamOrderByWithRelationInput;
};
export type ExamResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ExamResultWhereInput | Prisma.ExamResultWhereInput[];
    OR?: Prisma.ExamResultWhereInput[];
    NOT?: Prisma.ExamResultWhereInput | Prisma.ExamResultWhereInput[];
    userId?: Prisma.StringFilter<"ExamResult"> | string;
    examId?: Prisma.StringFilter<"ExamResult"> | string;
    score?: Prisma.FloatFilter<"ExamResult"> | number;
    correctCount?: Prisma.IntFilter<"ExamResult"> | number;
    timeSpent?: Prisma.IntFilter<"ExamResult"> | number;
    submittedAt?: Prisma.DateTimeFilter<"ExamResult"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    exam?: Prisma.XOR<Prisma.ExamScalarRelationFilter, Prisma.ExamWhereInput>;
}, "id">;
export type ExamResultOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    correctCount?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    _count?: Prisma.ExamResultCountOrderByAggregateInput;
    _avg?: Prisma.ExamResultAvgOrderByAggregateInput;
    _max?: Prisma.ExamResultMaxOrderByAggregateInput;
    _min?: Prisma.ExamResultMinOrderByAggregateInput;
    _sum?: Prisma.ExamResultSumOrderByAggregateInput;
};
export type ExamResultScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExamResultScalarWhereWithAggregatesInput | Prisma.ExamResultScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExamResultScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExamResultScalarWhereWithAggregatesInput | Prisma.ExamResultScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ExamResult"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ExamResult"> | string;
    examId?: Prisma.StringWithAggregatesFilter<"ExamResult"> | string;
    score?: Prisma.FloatWithAggregatesFilter<"ExamResult"> | number;
    correctCount?: Prisma.IntWithAggregatesFilter<"ExamResult"> | number;
    timeSpent?: Prisma.IntWithAggregatesFilter<"ExamResult"> | number;
    submittedAt?: Prisma.DateTimeWithAggregatesFilter<"ExamResult"> | Date | string;
};
export type ExamResultCreateInput = {
    id?: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExamResultsInput;
    exam: Prisma.ExamCreateNestedOneWithoutResultsInput;
};
export type ExamResultUncheckedCreateInput = {
    id?: string;
    userId: string;
    examId: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
};
export type ExamResultUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExamResultsNestedInput;
    exam?: Prisma.ExamUpdateOneRequiredWithoutResultsNestedInput;
};
export type ExamResultUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    examId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamResultCreateManyInput = {
    id?: string;
    userId: string;
    examId: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
};
export type ExamResultUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamResultUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    examId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamResultListRelationFilter = {
    every?: Prisma.ExamResultWhereInput;
    some?: Prisma.ExamResultWhereInput;
    none?: Prisma.ExamResultWhereInput;
};
export type ExamResultOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExamResultCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    correctCount?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
};
export type ExamResultAvgOrderByAggregateInput = {
    score?: Prisma.SortOrder;
    correctCount?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
};
export type ExamResultMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    correctCount?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
};
export type ExamResultMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    correctCount?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
};
export type ExamResultSumOrderByAggregateInput = {
    score?: Prisma.SortOrder;
    correctCount?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
};
export type ExamResultCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExamResultCreateWithoutUserInput, Prisma.ExamResultUncheckedCreateWithoutUserInput> | Prisma.ExamResultCreateWithoutUserInput[] | Prisma.ExamResultUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExamResultCreateOrConnectWithoutUserInput | Prisma.ExamResultCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExamResultCreateManyUserInputEnvelope;
    connect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
};
export type ExamResultUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExamResultCreateWithoutUserInput, Prisma.ExamResultUncheckedCreateWithoutUserInput> | Prisma.ExamResultCreateWithoutUserInput[] | Prisma.ExamResultUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExamResultCreateOrConnectWithoutUserInput | Prisma.ExamResultCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExamResultCreateManyUserInputEnvelope;
    connect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
};
export type ExamResultUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExamResultCreateWithoutUserInput, Prisma.ExamResultUncheckedCreateWithoutUserInput> | Prisma.ExamResultCreateWithoutUserInput[] | Prisma.ExamResultUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExamResultCreateOrConnectWithoutUserInput | Prisma.ExamResultCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExamResultUpsertWithWhereUniqueWithoutUserInput | Prisma.ExamResultUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExamResultCreateManyUserInputEnvelope;
    set?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    disconnect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    delete?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    connect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    update?: Prisma.ExamResultUpdateWithWhereUniqueWithoutUserInput | Prisma.ExamResultUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExamResultUpdateManyWithWhereWithoutUserInput | Prisma.ExamResultUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExamResultScalarWhereInput | Prisma.ExamResultScalarWhereInput[];
};
export type ExamResultUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExamResultCreateWithoutUserInput, Prisma.ExamResultUncheckedCreateWithoutUserInput> | Prisma.ExamResultCreateWithoutUserInput[] | Prisma.ExamResultUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExamResultCreateOrConnectWithoutUserInput | Prisma.ExamResultCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExamResultUpsertWithWhereUniqueWithoutUserInput | Prisma.ExamResultUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExamResultCreateManyUserInputEnvelope;
    set?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    disconnect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    delete?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    connect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    update?: Prisma.ExamResultUpdateWithWhereUniqueWithoutUserInput | Prisma.ExamResultUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExamResultUpdateManyWithWhereWithoutUserInput | Prisma.ExamResultUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExamResultScalarWhereInput | Prisma.ExamResultScalarWhereInput[];
};
export type ExamResultCreateNestedManyWithoutExamInput = {
    create?: Prisma.XOR<Prisma.ExamResultCreateWithoutExamInput, Prisma.ExamResultUncheckedCreateWithoutExamInput> | Prisma.ExamResultCreateWithoutExamInput[] | Prisma.ExamResultUncheckedCreateWithoutExamInput[];
    connectOrCreate?: Prisma.ExamResultCreateOrConnectWithoutExamInput | Prisma.ExamResultCreateOrConnectWithoutExamInput[];
    createMany?: Prisma.ExamResultCreateManyExamInputEnvelope;
    connect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
};
export type ExamResultUncheckedCreateNestedManyWithoutExamInput = {
    create?: Prisma.XOR<Prisma.ExamResultCreateWithoutExamInput, Prisma.ExamResultUncheckedCreateWithoutExamInput> | Prisma.ExamResultCreateWithoutExamInput[] | Prisma.ExamResultUncheckedCreateWithoutExamInput[];
    connectOrCreate?: Prisma.ExamResultCreateOrConnectWithoutExamInput | Prisma.ExamResultCreateOrConnectWithoutExamInput[];
    createMany?: Prisma.ExamResultCreateManyExamInputEnvelope;
    connect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
};
export type ExamResultUpdateManyWithoutExamNestedInput = {
    create?: Prisma.XOR<Prisma.ExamResultCreateWithoutExamInput, Prisma.ExamResultUncheckedCreateWithoutExamInput> | Prisma.ExamResultCreateWithoutExamInput[] | Prisma.ExamResultUncheckedCreateWithoutExamInput[];
    connectOrCreate?: Prisma.ExamResultCreateOrConnectWithoutExamInput | Prisma.ExamResultCreateOrConnectWithoutExamInput[];
    upsert?: Prisma.ExamResultUpsertWithWhereUniqueWithoutExamInput | Prisma.ExamResultUpsertWithWhereUniqueWithoutExamInput[];
    createMany?: Prisma.ExamResultCreateManyExamInputEnvelope;
    set?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    disconnect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    delete?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    connect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    update?: Prisma.ExamResultUpdateWithWhereUniqueWithoutExamInput | Prisma.ExamResultUpdateWithWhereUniqueWithoutExamInput[];
    updateMany?: Prisma.ExamResultUpdateManyWithWhereWithoutExamInput | Prisma.ExamResultUpdateManyWithWhereWithoutExamInput[];
    deleteMany?: Prisma.ExamResultScalarWhereInput | Prisma.ExamResultScalarWhereInput[];
};
export type ExamResultUncheckedUpdateManyWithoutExamNestedInput = {
    create?: Prisma.XOR<Prisma.ExamResultCreateWithoutExamInput, Prisma.ExamResultUncheckedCreateWithoutExamInput> | Prisma.ExamResultCreateWithoutExamInput[] | Prisma.ExamResultUncheckedCreateWithoutExamInput[];
    connectOrCreate?: Prisma.ExamResultCreateOrConnectWithoutExamInput | Prisma.ExamResultCreateOrConnectWithoutExamInput[];
    upsert?: Prisma.ExamResultUpsertWithWhereUniqueWithoutExamInput | Prisma.ExamResultUpsertWithWhereUniqueWithoutExamInput[];
    createMany?: Prisma.ExamResultCreateManyExamInputEnvelope;
    set?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    disconnect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    delete?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    connect?: Prisma.ExamResultWhereUniqueInput | Prisma.ExamResultWhereUniqueInput[];
    update?: Prisma.ExamResultUpdateWithWhereUniqueWithoutExamInput | Prisma.ExamResultUpdateWithWhereUniqueWithoutExamInput[];
    updateMany?: Prisma.ExamResultUpdateManyWithWhereWithoutExamInput | Prisma.ExamResultUpdateManyWithWhereWithoutExamInput[];
    deleteMany?: Prisma.ExamResultScalarWhereInput | Prisma.ExamResultScalarWhereInput[];
};
export type ExamResultCreateWithoutUserInput = {
    id?: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
    exam: Prisma.ExamCreateNestedOneWithoutResultsInput;
};
export type ExamResultUncheckedCreateWithoutUserInput = {
    id?: string;
    examId: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
};
export type ExamResultCreateOrConnectWithoutUserInput = {
    where: Prisma.ExamResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamResultCreateWithoutUserInput, Prisma.ExamResultUncheckedCreateWithoutUserInput>;
};
export type ExamResultCreateManyUserInputEnvelope = {
    data: Prisma.ExamResultCreateManyUserInput | Prisma.ExamResultCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ExamResultUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExamResultWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamResultUpdateWithoutUserInput, Prisma.ExamResultUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ExamResultCreateWithoutUserInput, Prisma.ExamResultUncheckedCreateWithoutUserInput>;
};
export type ExamResultUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExamResultWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamResultUpdateWithoutUserInput, Prisma.ExamResultUncheckedUpdateWithoutUserInput>;
};
export type ExamResultUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ExamResultScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamResultUpdateManyMutationInput, Prisma.ExamResultUncheckedUpdateManyWithoutUserInput>;
};
export type ExamResultScalarWhereInput = {
    AND?: Prisma.ExamResultScalarWhereInput | Prisma.ExamResultScalarWhereInput[];
    OR?: Prisma.ExamResultScalarWhereInput[];
    NOT?: Prisma.ExamResultScalarWhereInput | Prisma.ExamResultScalarWhereInput[];
    id?: Prisma.StringFilter<"ExamResult"> | string;
    userId?: Prisma.StringFilter<"ExamResult"> | string;
    examId?: Prisma.StringFilter<"ExamResult"> | string;
    score?: Prisma.FloatFilter<"ExamResult"> | number;
    correctCount?: Prisma.IntFilter<"ExamResult"> | number;
    timeSpent?: Prisma.IntFilter<"ExamResult"> | number;
    submittedAt?: Prisma.DateTimeFilter<"ExamResult"> | Date | string;
};
export type ExamResultCreateWithoutExamInput = {
    id?: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExamResultsInput;
};
export type ExamResultUncheckedCreateWithoutExamInput = {
    id?: string;
    userId: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
};
export type ExamResultCreateOrConnectWithoutExamInput = {
    where: Prisma.ExamResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamResultCreateWithoutExamInput, Prisma.ExamResultUncheckedCreateWithoutExamInput>;
};
export type ExamResultCreateManyExamInputEnvelope = {
    data: Prisma.ExamResultCreateManyExamInput | Prisma.ExamResultCreateManyExamInput[];
    skipDuplicates?: boolean;
};
export type ExamResultUpsertWithWhereUniqueWithoutExamInput = {
    where: Prisma.ExamResultWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExamResultUpdateWithoutExamInput, Prisma.ExamResultUncheckedUpdateWithoutExamInput>;
    create: Prisma.XOR<Prisma.ExamResultCreateWithoutExamInput, Prisma.ExamResultUncheckedCreateWithoutExamInput>;
};
export type ExamResultUpdateWithWhereUniqueWithoutExamInput = {
    where: Prisma.ExamResultWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExamResultUpdateWithoutExamInput, Prisma.ExamResultUncheckedUpdateWithoutExamInput>;
};
export type ExamResultUpdateManyWithWhereWithoutExamInput = {
    where: Prisma.ExamResultScalarWhereInput;
    data: Prisma.XOR<Prisma.ExamResultUpdateManyMutationInput, Prisma.ExamResultUncheckedUpdateManyWithoutExamInput>;
};
export type ExamResultCreateManyUserInput = {
    id?: string;
    examId: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
};
export type ExamResultUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exam?: Prisma.ExamUpdateOneRequiredWithoutResultsNestedInput;
};
export type ExamResultUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamResultUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamResultCreateManyExamInput = {
    id?: string;
    userId: string;
    score: number;
    correctCount: number;
    timeSpent: number;
    submittedAt?: Date | string;
};
export type ExamResultUpdateWithoutExamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExamResultsNestedInput;
};
export type ExamResultUncheckedUpdateWithoutExamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamResultUncheckedUpdateManyWithoutExamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    correctCount?: Prisma.IntFieldUpdateOperationsInput | number;
    timeSpent?: Prisma.IntFieldUpdateOperationsInput | number;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamResultSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    examId?: boolean;
    score?: boolean;
    correctCount?: boolean;
    timeSpent?: boolean;
    submittedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examResult"]>;
export type ExamResultSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    examId?: boolean;
    score?: boolean;
    correctCount?: boolean;
    timeSpent?: boolean;
    submittedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examResult"]>;
export type ExamResultSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    examId?: boolean;
    score?: boolean;
    correctCount?: boolean;
    timeSpent?: boolean;
    submittedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["examResult"]>;
export type ExamResultSelectScalar = {
    id?: boolean;
    userId?: boolean;
    examId?: boolean;
    score?: boolean;
    correctCount?: boolean;
    timeSpent?: boolean;
    submittedAt?: boolean;
};
export type ExamResultOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "examId" | "score" | "correctCount" | "timeSpent" | "submittedAt", ExtArgs["result"]["examResult"]>;
export type ExamResultInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
};
export type ExamResultIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
};
export type ExamResultIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
};
export type $ExamResultPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ExamResult";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        exam: Prisma.$ExamPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        examId: string;
        score: number;
        correctCount: number;
        timeSpent: number;
        submittedAt: Date;
    }, ExtArgs["result"]["examResult"]>;
    composites: {};
};
export type ExamResultGetPayload<S extends boolean | null | undefined | ExamResultDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExamResultPayload, S>;
export type ExamResultCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExamResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExamResultCountAggregateInputType | true;
};
export interface ExamResultDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ExamResult'];
        meta: {
            name: 'ExamResult';
        };
    };
    findUnique<T extends ExamResultFindUniqueArgs>(args: Prisma.SelectSubset<T, ExamResultFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExamResultFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExamResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExamResultFindFirstArgs>(args?: Prisma.SelectSubset<T, ExamResultFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExamResultFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExamResultFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExamResultFindManyArgs>(args?: Prisma.SelectSubset<T, ExamResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExamResultCreateArgs>(args: Prisma.SelectSubset<T, ExamResultCreateArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExamResultCreateManyArgs>(args?: Prisma.SelectSubset<T, ExamResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExamResultCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExamResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExamResultDeleteArgs>(args: Prisma.SelectSubset<T, ExamResultDeleteArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExamResultUpdateArgs>(args: Prisma.SelectSubset<T, ExamResultUpdateArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExamResultDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExamResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExamResultUpdateManyArgs>(args: Prisma.SelectSubset<T, ExamResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExamResultUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExamResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExamResultUpsertArgs>(args: Prisma.SelectSubset<T, ExamResultUpsertArgs<ExtArgs>>): Prisma.Prisma__ExamResultClient<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExamResultCountArgs>(args?: Prisma.Subset<T, ExamResultCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExamResultCountAggregateOutputType> : number>;
    aggregate<T extends ExamResultAggregateArgs>(args: Prisma.Subset<T, ExamResultAggregateArgs>): Prisma.PrismaPromise<GetExamResultAggregateType<T>>;
    groupBy<T extends ExamResultGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExamResultGroupByArgs['orderBy'];
    } : {
        orderBy?: ExamResultGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExamResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExamResultFieldRefs;
}
export interface Prisma__ExamResultClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    exam<T extends Prisma.ExamDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamDefaultArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExamResultFieldRefs {
    readonly id: Prisma.FieldRef<"ExamResult", 'String'>;
    readonly userId: Prisma.FieldRef<"ExamResult", 'String'>;
    readonly examId: Prisma.FieldRef<"ExamResult", 'String'>;
    readonly score: Prisma.FieldRef<"ExamResult", 'Float'>;
    readonly correctCount: Prisma.FieldRef<"ExamResult", 'Int'>;
    readonly timeSpent: Prisma.FieldRef<"ExamResult", 'Int'>;
    readonly submittedAt: Prisma.FieldRef<"ExamResult", 'DateTime'>;
}
export type ExamResultFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    where: Prisma.ExamResultWhereUniqueInput;
};
export type ExamResultFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    where: Prisma.ExamResultWhereUniqueInput;
};
export type ExamResultFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamResultFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamResultFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamResultCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamResultCreateInput, Prisma.ExamResultUncheckedCreateInput>;
};
export type ExamResultCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExamResultCreateManyInput | Prisma.ExamResultCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExamResultCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    data: Prisma.ExamResultCreateManyInput | Prisma.ExamResultCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExamResultIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExamResultUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamResultUpdateInput, Prisma.ExamResultUncheckedUpdateInput>;
    where: Prisma.ExamResultWhereUniqueInput;
};
export type ExamResultUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExamResultUpdateManyMutationInput, Prisma.ExamResultUncheckedUpdateManyInput>;
    where?: Prisma.ExamResultWhereInput;
    limit?: number;
};
export type ExamResultUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamResultUpdateManyMutationInput, Prisma.ExamResultUncheckedUpdateManyInput>;
    where?: Prisma.ExamResultWhereInput;
    limit?: number;
    include?: Prisma.ExamResultIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExamResultUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    where: Prisma.ExamResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamResultCreateInput, Prisma.ExamResultUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExamResultUpdateInput, Prisma.ExamResultUncheckedUpdateInput>;
};
export type ExamResultDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    where: Prisma.ExamResultWhereUniqueInput;
};
export type ExamResultDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamResultWhereInput;
    limit?: number;
};
export type ExamResultDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
};
export {};
