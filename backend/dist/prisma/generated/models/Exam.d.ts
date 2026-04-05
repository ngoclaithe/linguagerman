import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExamModel = runtime.Types.Result.DefaultSelection<Prisma.$ExamPayload>;
export type AggregateExam = {
    _count: ExamCountAggregateOutputType | null;
    _avg: ExamAvgAggregateOutputType | null;
    _sum: ExamSumAggregateOutputType | null;
    _min: ExamMinAggregateOutputType | null;
    _max: ExamMaxAggregateOutputType | null;
};
export type ExamAvgAggregateOutputType = {
    duration: number | null;
};
export type ExamSumAggregateOutputType = {
    duration: number | null;
};
export type ExamMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    level: $Enums.CourseLevel | null;
    duration: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ExamMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    level: $Enums.CourseLevel | null;
    duration: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ExamCountAggregateOutputType = {
    id: number;
    title: number;
    level: number;
    duration: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ExamAvgAggregateInputType = {
    duration?: true;
};
export type ExamSumAggregateInputType = {
    duration?: true;
};
export type ExamMinAggregateInputType = {
    id?: true;
    title?: true;
    level?: true;
    duration?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ExamMaxAggregateInputType = {
    id?: true;
    title?: true;
    level?: true;
    duration?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ExamCountAggregateInputType = {
    id?: true;
    title?: true;
    level?: true;
    duration?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ExamAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamWhereInput;
    orderBy?: Prisma.ExamOrderByWithRelationInput | Prisma.ExamOrderByWithRelationInput[];
    cursor?: Prisma.ExamWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExamCountAggregateInputType;
    _avg?: ExamAvgAggregateInputType;
    _sum?: ExamSumAggregateInputType;
    _min?: ExamMinAggregateInputType;
    _max?: ExamMaxAggregateInputType;
};
export type GetExamAggregateType<T extends ExamAggregateArgs> = {
    [P in keyof T & keyof AggregateExam]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExam[P]> : Prisma.GetScalarType<T[P], AggregateExam[P]>;
};
export type ExamGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamWhereInput;
    orderBy?: Prisma.ExamOrderByWithAggregationInput | Prisma.ExamOrderByWithAggregationInput[];
    by: Prisma.ExamScalarFieldEnum[] | Prisma.ExamScalarFieldEnum;
    having?: Prisma.ExamScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExamCountAggregateInputType | true;
    _avg?: ExamAvgAggregateInputType;
    _sum?: ExamSumAggregateInputType;
    _min?: ExamMinAggregateInputType;
    _max?: ExamMaxAggregateInputType;
};
export type ExamGroupByOutputType = {
    id: string;
    title: string;
    level: $Enums.CourseLevel;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ExamCountAggregateOutputType | null;
    _avg: ExamAvgAggregateOutputType | null;
    _sum: ExamSumAggregateOutputType | null;
    _min: ExamMinAggregateOutputType | null;
    _max: ExamMaxAggregateOutputType | null;
};
type GetExamGroupByPayload<T extends ExamGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExamGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExamGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExamGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExamGroupByOutputType[P]>;
}>>;
export type ExamWhereInput = {
    AND?: Prisma.ExamWhereInput | Prisma.ExamWhereInput[];
    OR?: Prisma.ExamWhereInput[];
    NOT?: Prisma.ExamWhereInput | Prisma.ExamWhereInput[];
    id?: Prisma.StringFilter<"Exam"> | string;
    title?: Prisma.StringFilter<"Exam"> | string;
    level?: Prisma.EnumCourseLevelFilter<"Exam"> | $Enums.CourseLevel;
    duration?: Prisma.IntFilter<"Exam"> | number;
    createdAt?: Prisma.DateTimeFilter<"Exam"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Exam"> | Date | string;
    questions?: Prisma.QuestionListRelationFilter;
    results?: Prisma.ExamResultListRelationFilter;
};
export type ExamOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    questions?: Prisma.QuestionOrderByRelationAggregateInput;
    results?: Prisma.ExamResultOrderByRelationAggregateInput;
};
export type ExamWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ExamWhereInput | Prisma.ExamWhereInput[];
    OR?: Prisma.ExamWhereInput[];
    NOT?: Prisma.ExamWhereInput | Prisma.ExamWhereInput[];
    title?: Prisma.StringFilter<"Exam"> | string;
    level?: Prisma.EnumCourseLevelFilter<"Exam"> | $Enums.CourseLevel;
    duration?: Prisma.IntFilter<"Exam"> | number;
    createdAt?: Prisma.DateTimeFilter<"Exam"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Exam"> | Date | string;
    questions?: Prisma.QuestionListRelationFilter;
    results?: Prisma.ExamResultListRelationFilter;
}, "id">;
export type ExamOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ExamCountOrderByAggregateInput;
    _avg?: Prisma.ExamAvgOrderByAggregateInput;
    _max?: Prisma.ExamMaxOrderByAggregateInput;
    _min?: Prisma.ExamMinOrderByAggregateInput;
    _sum?: Prisma.ExamSumOrderByAggregateInput;
};
export type ExamScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExamScalarWhereWithAggregatesInput | Prisma.ExamScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExamScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExamScalarWhereWithAggregatesInput | Prisma.ExamScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Exam"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Exam"> | string;
    level?: Prisma.EnumCourseLevelWithAggregatesFilter<"Exam"> | $Enums.CourseLevel;
    duration?: Prisma.IntWithAggregatesFilter<"Exam"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Exam"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Exam"> | Date | string;
};
export type ExamCreateInput = {
    id?: string;
    title: string;
    level: $Enums.CourseLevel;
    duration: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.QuestionCreateNestedManyWithoutExamInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutExamInput;
};
export type ExamUncheckedCreateInput = {
    id?: string;
    title: string;
    level: $Enums.CourseLevel;
    duration: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.QuestionUncheckedCreateNestedManyWithoutExamInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutExamInput;
};
export type ExamUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    duration?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.QuestionUpdateManyWithoutExamNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutExamNestedInput;
};
export type ExamUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    duration?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.QuestionUncheckedUpdateManyWithoutExamNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutExamNestedInput;
};
export type ExamCreateManyInput = {
    id?: string;
    title: string;
    level: $Enums.CourseLevel;
    duration: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ExamUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    duration?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    duration?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExamCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamAvgOrderByAggregateInput = {
    duration?: Prisma.SortOrder;
};
export type ExamMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ExamSumOrderByAggregateInput = {
    duration?: Prisma.SortOrder;
};
export type ExamScalarRelationFilter = {
    is?: Prisma.ExamWhereInput;
    isNot?: Prisma.ExamWhereInput;
};
export type ExamCreateNestedOneWithoutQuestionsInput = {
    create?: Prisma.XOR<Prisma.ExamCreateWithoutQuestionsInput, Prisma.ExamUncheckedCreateWithoutQuestionsInput>;
    connectOrCreate?: Prisma.ExamCreateOrConnectWithoutQuestionsInput;
    connect?: Prisma.ExamWhereUniqueInput;
};
export type ExamUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: Prisma.XOR<Prisma.ExamCreateWithoutQuestionsInput, Prisma.ExamUncheckedCreateWithoutQuestionsInput>;
    connectOrCreate?: Prisma.ExamCreateOrConnectWithoutQuestionsInput;
    upsert?: Prisma.ExamUpsertWithoutQuestionsInput;
    connect?: Prisma.ExamWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExamUpdateToOneWithWhereWithoutQuestionsInput, Prisma.ExamUpdateWithoutQuestionsInput>, Prisma.ExamUncheckedUpdateWithoutQuestionsInput>;
};
export type ExamCreateNestedOneWithoutResultsInput = {
    create?: Prisma.XOR<Prisma.ExamCreateWithoutResultsInput, Prisma.ExamUncheckedCreateWithoutResultsInput>;
    connectOrCreate?: Prisma.ExamCreateOrConnectWithoutResultsInput;
    connect?: Prisma.ExamWhereUniqueInput;
};
export type ExamUpdateOneRequiredWithoutResultsNestedInput = {
    create?: Prisma.XOR<Prisma.ExamCreateWithoutResultsInput, Prisma.ExamUncheckedCreateWithoutResultsInput>;
    connectOrCreate?: Prisma.ExamCreateOrConnectWithoutResultsInput;
    upsert?: Prisma.ExamUpsertWithoutResultsInput;
    connect?: Prisma.ExamWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExamUpdateToOneWithWhereWithoutResultsInput, Prisma.ExamUpdateWithoutResultsInput>, Prisma.ExamUncheckedUpdateWithoutResultsInput>;
};
export type ExamCreateWithoutQuestionsInput = {
    id?: string;
    title: string;
    level: $Enums.CourseLevel;
    duration: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    results?: Prisma.ExamResultCreateNestedManyWithoutExamInput;
};
export type ExamUncheckedCreateWithoutQuestionsInput = {
    id?: string;
    title: string;
    level: $Enums.CourseLevel;
    duration: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutExamInput;
};
export type ExamCreateOrConnectWithoutQuestionsInput = {
    where: Prisma.ExamWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamCreateWithoutQuestionsInput, Prisma.ExamUncheckedCreateWithoutQuestionsInput>;
};
export type ExamUpsertWithoutQuestionsInput = {
    update: Prisma.XOR<Prisma.ExamUpdateWithoutQuestionsInput, Prisma.ExamUncheckedUpdateWithoutQuestionsInput>;
    create: Prisma.XOR<Prisma.ExamCreateWithoutQuestionsInput, Prisma.ExamUncheckedCreateWithoutQuestionsInput>;
    where?: Prisma.ExamWhereInput;
};
export type ExamUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: Prisma.ExamWhereInput;
    data: Prisma.XOR<Prisma.ExamUpdateWithoutQuestionsInput, Prisma.ExamUncheckedUpdateWithoutQuestionsInput>;
};
export type ExamUpdateWithoutQuestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    duration?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    results?: Prisma.ExamResultUpdateManyWithoutExamNestedInput;
};
export type ExamUncheckedUpdateWithoutQuestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    duration?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutExamNestedInput;
};
export type ExamCreateWithoutResultsInput = {
    id?: string;
    title: string;
    level: $Enums.CourseLevel;
    duration: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.QuestionCreateNestedManyWithoutExamInput;
};
export type ExamUncheckedCreateWithoutResultsInput = {
    id?: string;
    title: string;
    level: $Enums.CourseLevel;
    duration: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    questions?: Prisma.QuestionUncheckedCreateNestedManyWithoutExamInput;
};
export type ExamCreateOrConnectWithoutResultsInput = {
    where: Prisma.ExamWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamCreateWithoutResultsInput, Prisma.ExamUncheckedCreateWithoutResultsInput>;
};
export type ExamUpsertWithoutResultsInput = {
    update: Prisma.XOR<Prisma.ExamUpdateWithoutResultsInput, Prisma.ExamUncheckedUpdateWithoutResultsInput>;
    create: Prisma.XOR<Prisma.ExamCreateWithoutResultsInput, Prisma.ExamUncheckedCreateWithoutResultsInput>;
    where?: Prisma.ExamWhereInput;
};
export type ExamUpdateToOneWithWhereWithoutResultsInput = {
    where?: Prisma.ExamWhereInput;
    data: Prisma.XOR<Prisma.ExamUpdateWithoutResultsInput, Prisma.ExamUncheckedUpdateWithoutResultsInput>;
};
export type ExamUpdateWithoutResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    duration?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.QuestionUpdateManyWithoutExamNestedInput;
};
export type ExamUncheckedUpdateWithoutResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    duration?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    questions?: Prisma.QuestionUncheckedUpdateManyWithoutExamNestedInput;
};
export type ExamCountOutputType = {
    questions: number;
    results: number;
};
export type ExamCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    questions?: boolean | ExamCountOutputTypeCountQuestionsArgs;
    results?: boolean | ExamCountOutputTypeCountResultsArgs;
};
export type ExamCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamCountOutputTypeSelect<ExtArgs> | null;
};
export type ExamCountOutputTypeCountQuestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
};
export type ExamCountOutputTypeCountResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamResultWhereInput;
};
export type ExamSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    level?: boolean;
    duration?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    questions?: boolean | Prisma.Exam$questionsArgs<ExtArgs>;
    results?: boolean | Prisma.Exam$resultsArgs<ExtArgs>;
    _count?: boolean | Prisma.ExamCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["exam"]>;
export type ExamSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    level?: boolean;
    duration?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["exam"]>;
export type ExamSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    level?: boolean;
    duration?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["exam"]>;
export type ExamSelectScalar = {
    id?: boolean;
    title?: boolean;
    level?: boolean;
    duration?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ExamOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "level" | "duration" | "createdAt" | "updatedAt", ExtArgs["result"]["exam"]>;
export type ExamInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    questions?: boolean | Prisma.Exam$questionsArgs<ExtArgs>;
    results?: boolean | Prisma.Exam$resultsArgs<ExtArgs>;
    _count?: boolean | Prisma.ExamCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ExamIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ExamIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ExamPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Exam";
    objects: {
        questions: Prisma.$QuestionPayload<ExtArgs>[];
        results: Prisma.$ExamResultPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        level: $Enums.CourseLevel;
        duration: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["exam"]>;
    composites: {};
};
export type ExamGetPayload<S extends boolean | null | undefined | ExamDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExamPayload, S>;
export type ExamCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExamCountAggregateInputType | true;
};
export interface ExamDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Exam'];
        meta: {
            name: 'Exam';
        };
    };
    findUnique<T extends ExamFindUniqueArgs>(args: Prisma.SelectSubset<T, ExamFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExamFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExamFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExamFindFirstArgs>(args?: Prisma.SelectSubset<T, ExamFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExamFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExamFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExamFindManyArgs>(args?: Prisma.SelectSubset<T, ExamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExamCreateArgs>(args: Prisma.SelectSubset<T, ExamCreateArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExamCreateManyArgs>(args?: Prisma.SelectSubset<T, ExamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExamCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExamDeleteArgs>(args: Prisma.SelectSubset<T, ExamDeleteArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExamUpdateArgs>(args: Prisma.SelectSubset<T, ExamUpdateArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExamDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExamUpdateManyArgs>(args: Prisma.SelectSubset<T, ExamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExamUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExamUpsertArgs>(args: Prisma.SelectSubset<T, ExamUpsertArgs<ExtArgs>>): Prisma.Prisma__ExamClient<runtime.Types.Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExamCountArgs>(args?: Prisma.Subset<T, ExamCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExamCountAggregateOutputType> : number>;
    aggregate<T extends ExamAggregateArgs>(args: Prisma.Subset<T, ExamAggregateArgs>): Prisma.PrismaPromise<GetExamAggregateType<T>>;
    groupBy<T extends ExamGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExamGroupByArgs['orderBy'];
    } : {
        orderBy?: ExamGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExamFieldRefs;
}
export interface Prisma__ExamClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    questions<T extends Prisma.Exam$questionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Exam$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    results<T extends Prisma.Exam$resultsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Exam$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExamFieldRefs {
    readonly id: Prisma.FieldRef<"Exam", 'String'>;
    readonly title: Prisma.FieldRef<"Exam", 'String'>;
    readonly level: Prisma.FieldRef<"Exam", 'CourseLevel'>;
    readonly duration: Prisma.FieldRef<"Exam", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Exam", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Exam", 'DateTime'>;
}
export type ExamFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    where: Prisma.ExamWhereUniqueInput;
};
export type ExamFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    where: Prisma.ExamWhereUniqueInput;
};
export type ExamFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    where?: Prisma.ExamWhereInput;
    orderBy?: Prisma.ExamOrderByWithRelationInput | Prisma.ExamOrderByWithRelationInput[];
    cursor?: Prisma.ExamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamScalarFieldEnum | Prisma.ExamScalarFieldEnum[];
};
export type ExamFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    where?: Prisma.ExamWhereInput;
    orderBy?: Prisma.ExamOrderByWithRelationInput | Prisma.ExamOrderByWithRelationInput[];
    cursor?: Prisma.ExamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamScalarFieldEnum | Prisma.ExamScalarFieldEnum[];
};
export type ExamFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    where?: Prisma.ExamWhereInput;
    orderBy?: Prisma.ExamOrderByWithRelationInput | Prisma.ExamOrderByWithRelationInput[];
    cursor?: Prisma.ExamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamScalarFieldEnum | Prisma.ExamScalarFieldEnum[];
};
export type ExamCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamCreateInput, Prisma.ExamUncheckedCreateInput>;
};
export type ExamCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExamCreateManyInput | Prisma.ExamCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExamCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    data: Prisma.ExamCreateManyInput | Prisma.ExamCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExamUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamUpdateInput, Prisma.ExamUncheckedUpdateInput>;
    where: Prisma.ExamWhereUniqueInput;
};
export type ExamUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExamUpdateManyMutationInput, Prisma.ExamUncheckedUpdateManyInput>;
    where?: Prisma.ExamWhereInput;
    limit?: number;
};
export type ExamUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExamUpdateManyMutationInput, Prisma.ExamUncheckedUpdateManyInput>;
    where?: Prisma.ExamWhereInput;
    limit?: number;
};
export type ExamUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    where: Prisma.ExamWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExamCreateInput, Prisma.ExamUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExamUpdateInput, Prisma.ExamUncheckedUpdateInput>;
};
export type ExamDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
    where: Prisma.ExamWhereUniqueInput;
};
export type ExamDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamWhereInput;
    limit?: number;
};
export type Exam$questionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Exam$resultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExamDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExamSelect<ExtArgs> | null;
    omit?: Prisma.ExamOmit<ExtArgs> | null;
    include?: Prisma.ExamInclude<ExtArgs> | null;
};
export {};
