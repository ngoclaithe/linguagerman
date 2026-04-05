import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionPayload>;
export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null;
    _min: QuestionMinAggregateOutputType | null;
    _max: QuestionMaxAggregateOutputType | null;
};
export type QuestionMinAggregateOutputType = {
    id: string | null;
    examId: string | null;
    question: string | null;
    correctAnswer: string | null;
    explanation: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type QuestionMaxAggregateOutputType = {
    id: string | null;
    examId: string | null;
    question: string | null;
    correctAnswer: string | null;
    explanation: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type QuestionCountAggregateOutputType = {
    id: number;
    examId: number;
    question: number;
    options: number;
    correctAnswer: number;
    explanation: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type QuestionMinAggregateInputType = {
    id?: true;
    examId?: true;
    question?: true;
    correctAnswer?: true;
    explanation?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type QuestionMaxAggregateInputType = {
    id?: true;
    examId?: true;
    question?: true;
    correctAnswer?: true;
    explanation?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type QuestionCountAggregateInputType = {
    id?: true;
    examId?: true;
    question?: true;
    options?: true;
    correctAnswer?: true;
    explanation?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type QuestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionCountAggregateInputType;
    _min?: QuestionMinAggregateInputType;
    _max?: QuestionMaxAggregateInputType;
};
export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestion[P]> : Prisma.GetScalarType<T[P], AggregateQuestion[P]>;
};
export type QuestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithAggregationInput | Prisma.QuestionOrderByWithAggregationInput[];
    by: Prisma.QuestionScalarFieldEnum[] | Prisma.QuestionScalarFieldEnum;
    having?: Prisma.QuestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionCountAggregateInputType | true;
    _min?: QuestionMinAggregateInputType;
    _max?: QuestionMaxAggregateInputType;
};
export type QuestionGroupByOutputType = {
    id: string;
    examId: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: QuestionCountAggregateOutputType | null;
    _min: QuestionMinAggregateOutputType | null;
    _max: QuestionMaxAggregateOutputType | null;
};
type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionGroupByOutputType[P]>;
}>>;
export type QuestionWhereInput = {
    AND?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    OR?: Prisma.QuestionWhereInput[];
    NOT?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    id?: Prisma.StringFilter<"Question"> | string;
    examId?: Prisma.StringFilter<"Question"> | string;
    question?: Prisma.StringFilter<"Question"> | string;
    options?: Prisma.StringNullableListFilter<"Question">;
    correctAnswer?: Prisma.StringFilter<"Question"> | string;
    explanation?: Prisma.StringNullableFilter<"Question"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Question"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Question"> | Date | string;
    exam?: Prisma.XOR<Prisma.ExamScalarRelationFilter, Prisma.ExamWhereInput>;
};
export type QuestionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    correctAnswer?: Prisma.SortOrder;
    explanation?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    exam?: Prisma.ExamOrderByWithRelationInput;
};
export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    OR?: Prisma.QuestionWhereInput[];
    NOT?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    examId?: Prisma.StringFilter<"Question"> | string;
    question?: Prisma.StringFilter<"Question"> | string;
    options?: Prisma.StringNullableListFilter<"Question">;
    correctAnswer?: Prisma.StringFilter<"Question"> | string;
    explanation?: Prisma.StringNullableFilter<"Question"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Question"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Question"> | Date | string;
    exam?: Prisma.XOR<Prisma.ExamScalarRelationFilter, Prisma.ExamWhereInput>;
}, "id">;
export type QuestionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    correctAnswer?: Prisma.SortOrder;
    explanation?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.QuestionCountOrderByAggregateInput;
    _max?: Prisma.QuestionMaxOrderByAggregateInput;
    _min?: Prisma.QuestionMinOrderByAggregateInput;
};
export type QuestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionScalarWhereWithAggregatesInput | Prisma.QuestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionScalarWhereWithAggregatesInput | Prisma.QuestionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Question"> | string;
    examId?: Prisma.StringWithAggregatesFilter<"Question"> | string;
    question?: Prisma.StringWithAggregatesFilter<"Question"> | string;
    options?: Prisma.StringNullableListFilter<"Question">;
    correctAnswer?: Prisma.StringWithAggregatesFilter<"Question"> | string;
    explanation?: Prisma.StringNullableWithAggregatesFilter<"Question"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Question"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Question"> | Date | string;
};
export type QuestionCreateInput = {
    id?: string;
    question: string;
    options?: Prisma.QuestionCreateoptionsInput | string[];
    correctAnswer: string;
    explanation?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    exam: Prisma.ExamCreateNestedOneWithoutQuestionsInput;
};
export type QuestionUncheckedCreateInput = {
    id?: string;
    examId: string;
    question: string;
    options?: Prisma.QuestionCreateoptionsInput | string[];
    correctAnswer: string;
    explanation?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QuestionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.QuestionUpdateoptionsInput | string[];
    correctAnswer?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exam?: Prisma.ExamUpdateOneRequiredWithoutQuestionsNestedInput;
};
export type QuestionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examId?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.QuestionUpdateoptionsInput | string[];
    correctAnswer?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionCreateManyInput = {
    id?: string;
    examId: string;
    question: string;
    options?: Prisma.QuestionCreateoptionsInput | string[];
    correctAnswer: string;
    explanation?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QuestionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.QuestionUpdateoptionsInput | string[];
    correctAnswer?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    examId?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.QuestionUpdateoptionsInput | string[];
    correctAnswer?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionListRelationFilter = {
    every?: Prisma.QuestionWhereInput;
    some?: Prisma.QuestionWhereInput;
    none?: Prisma.QuestionWhereInput;
};
export type QuestionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type QuestionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    options?: Prisma.SortOrder;
    correctAnswer?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    correctAnswer?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    examId?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    correctAnswer?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionCreateNestedManyWithoutExamInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutExamInput, Prisma.QuestionUncheckedCreateWithoutExamInput> | Prisma.QuestionCreateWithoutExamInput[] | Prisma.QuestionUncheckedCreateWithoutExamInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutExamInput | Prisma.QuestionCreateOrConnectWithoutExamInput[];
    createMany?: Prisma.QuestionCreateManyExamInputEnvelope;
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
};
export type QuestionUncheckedCreateNestedManyWithoutExamInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutExamInput, Prisma.QuestionUncheckedCreateWithoutExamInput> | Prisma.QuestionCreateWithoutExamInput[] | Prisma.QuestionUncheckedCreateWithoutExamInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutExamInput | Prisma.QuestionCreateOrConnectWithoutExamInput[];
    createMany?: Prisma.QuestionCreateManyExamInputEnvelope;
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
};
export type QuestionUpdateManyWithoutExamNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutExamInput, Prisma.QuestionUncheckedCreateWithoutExamInput> | Prisma.QuestionCreateWithoutExamInput[] | Prisma.QuestionUncheckedCreateWithoutExamInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutExamInput | Prisma.QuestionCreateOrConnectWithoutExamInput[];
    upsert?: Prisma.QuestionUpsertWithWhereUniqueWithoutExamInput | Prisma.QuestionUpsertWithWhereUniqueWithoutExamInput[];
    createMany?: Prisma.QuestionCreateManyExamInputEnvelope;
    set?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    disconnect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    delete?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    update?: Prisma.QuestionUpdateWithWhereUniqueWithoutExamInput | Prisma.QuestionUpdateWithWhereUniqueWithoutExamInput[];
    updateMany?: Prisma.QuestionUpdateManyWithWhereWithoutExamInput | Prisma.QuestionUpdateManyWithWhereWithoutExamInput[];
    deleteMany?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
};
export type QuestionUncheckedUpdateManyWithoutExamNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutExamInput, Prisma.QuestionUncheckedCreateWithoutExamInput> | Prisma.QuestionCreateWithoutExamInput[] | Prisma.QuestionUncheckedCreateWithoutExamInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutExamInput | Prisma.QuestionCreateOrConnectWithoutExamInput[];
    upsert?: Prisma.QuestionUpsertWithWhereUniqueWithoutExamInput | Prisma.QuestionUpsertWithWhereUniqueWithoutExamInput[];
    createMany?: Prisma.QuestionCreateManyExamInputEnvelope;
    set?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    disconnect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    delete?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    update?: Prisma.QuestionUpdateWithWhereUniqueWithoutExamInput | Prisma.QuestionUpdateWithWhereUniqueWithoutExamInput[];
    updateMany?: Prisma.QuestionUpdateManyWithWhereWithoutExamInput | Prisma.QuestionUpdateManyWithWhereWithoutExamInput[];
    deleteMany?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
};
export type QuestionCreateoptionsInput = {
    set: string[];
};
export type QuestionUpdateoptionsInput = {
    set?: string[];
    push?: string | string[];
};
export type QuestionCreateWithoutExamInput = {
    id?: string;
    question: string;
    options?: Prisma.QuestionCreateoptionsInput | string[];
    correctAnswer: string;
    explanation?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QuestionUncheckedCreateWithoutExamInput = {
    id?: string;
    question: string;
    options?: Prisma.QuestionCreateoptionsInput | string[];
    correctAnswer: string;
    explanation?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QuestionCreateOrConnectWithoutExamInput = {
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutExamInput, Prisma.QuestionUncheckedCreateWithoutExamInput>;
};
export type QuestionCreateManyExamInputEnvelope = {
    data: Prisma.QuestionCreateManyExamInput | Prisma.QuestionCreateManyExamInput[];
    skipDuplicates?: boolean;
};
export type QuestionUpsertWithWhereUniqueWithoutExamInput = {
    where: Prisma.QuestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuestionUpdateWithoutExamInput, Prisma.QuestionUncheckedUpdateWithoutExamInput>;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutExamInput, Prisma.QuestionUncheckedCreateWithoutExamInput>;
};
export type QuestionUpdateWithWhereUniqueWithoutExamInput = {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuestionUpdateWithoutExamInput, Prisma.QuestionUncheckedUpdateWithoutExamInput>;
};
export type QuestionUpdateManyWithWhereWithoutExamInput = {
    where: Prisma.QuestionScalarWhereInput;
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyWithoutExamInput>;
};
export type QuestionScalarWhereInput = {
    AND?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
    OR?: Prisma.QuestionScalarWhereInput[];
    NOT?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
    id?: Prisma.StringFilter<"Question"> | string;
    examId?: Prisma.StringFilter<"Question"> | string;
    question?: Prisma.StringFilter<"Question"> | string;
    options?: Prisma.StringNullableListFilter<"Question">;
    correctAnswer?: Prisma.StringFilter<"Question"> | string;
    explanation?: Prisma.StringNullableFilter<"Question"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Question"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Question"> | Date | string;
};
export type QuestionCreateManyExamInput = {
    id?: string;
    question: string;
    options?: Prisma.QuestionCreateoptionsInput | string[];
    correctAnswer: string;
    explanation?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QuestionUpdateWithoutExamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.QuestionUpdateoptionsInput | string[];
    correctAnswer?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionUncheckedUpdateWithoutExamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.QuestionUpdateoptionsInput | string[];
    correctAnswer?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionUncheckedUpdateManyWithoutExamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    options?: Prisma.QuestionUpdateoptionsInput | string[];
    correctAnswer?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examId?: boolean;
    question?: boolean;
    options?: boolean;
    correctAnswer?: boolean;
    explanation?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examId?: boolean;
    question?: boolean;
    options?: boolean;
    correctAnswer?: boolean;
    explanation?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    examId?: boolean;
    question?: boolean;
    options?: boolean;
    correctAnswer?: boolean;
    explanation?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectScalar = {
    id?: boolean;
    examId?: boolean;
    question?: boolean;
    options?: boolean;
    correctAnswer?: boolean;
    explanation?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type QuestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "examId" | "question" | "options" | "correctAnswer" | "explanation" | "createdAt" | "updatedAt", ExtArgs["result"]["question"]>;
export type QuestionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
};
export type QuestionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
};
export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    exam?: boolean | Prisma.ExamDefaultArgs<ExtArgs>;
};
export type $QuestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Question";
    objects: {
        exam: Prisma.$ExamPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        examId: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["question"]>;
    composites: {};
};
export type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionPayload, S>;
export type QuestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionCountAggregateInputType | true;
};
export interface QuestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Question'];
        meta: {
            name: 'Question';
        };
    };
    findUnique<T extends QuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionCreateArgs>(args: Prisma.SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionDeleteArgs>(args: Prisma.SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionUpdateArgs>(args: Prisma.SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionUpsertArgs>(args: Prisma.SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionCountArgs>(args?: Prisma.Subset<T, QuestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionCountAggregateOutputType> : number>;
    aggregate<T extends QuestionAggregateArgs>(args: Prisma.Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>;
    groupBy<T extends QuestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionFieldRefs;
}
export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    exam<T extends Prisma.ExamDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExamDefaultArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionFieldRefs {
    readonly id: Prisma.FieldRef<"Question", 'String'>;
    readonly examId: Prisma.FieldRef<"Question", 'String'>;
    readonly question: Prisma.FieldRef<"Question", 'String'>;
    readonly options: Prisma.FieldRef<"Question", 'String[]'>;
    readonly correctAnswer: Prisma.FieldRef<"Question", 'String'>;
    readonly explanation: Prisma.FieldRef<"Question", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Question", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Question", 'DateTime'>;
}
export type QuestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionCreateInput, Prisma.QuestionUncheckedCreateInput>;
};
export type QuestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionCreateManyInput | Prisma.QuestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.QuestionCreateManyInput | Prisma.QuestionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionUpdateInput, Prisma.QuestionUncheckedUpdateInput>;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type QuestionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionWhereInput;
    limit?: number;
    include?: Prisma.QuestionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateInput, Prisma.QuestionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionUpdateInput, Prisma.QuestionUncheckedUpdateInput>;
};
export type QuestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type QuestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
};
export {};
