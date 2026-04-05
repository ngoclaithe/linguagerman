import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FlashcardModel = runtime.Types.Result.DefaultSelection<Prisma.$FlashcardPayload>;
export type AggregateFlashcard = {
    _count: FlashcardCountAggregateOutputType | null;
    _min: FlashcardMinAggregateOutputType | null;
    _max: FlashcardMaxAggregateOutputType | null;
};
export type FlashcardMinAggregateOutputType = {
    id: string | null;
    word: string | null;
    kana: string | null;
    meaning: string | null;
    example: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FlashcardMaxAggregateOutputType = {
    id: string | null;
    word: string | null;
    kana: string | null;
    meaning: string | null;
    example: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FlashcardCountAggregateOutputType = {
    id: number;
    word: number;
    kana: number;
    meaning: number;
    example: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FlashcardMinAggregateInputType = {
    id?: true;
    word?: true;
    kana?: true;
    meaning?: true;
    example?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FlashcardMaxAggregateInputType = {
    id?: true;
    word?: true;
    kana?: true;
    meaning?: true;
    example?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FlashcardCountAggregateInputType = {
    id?: true;
    word?: true;
    kana?: true;
    meaning?: true;
    example?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FlashcardAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlashcardWhereInput;
    orderBy?: Prisma.FlashcardOrderByWithRelationInput | Prisma.FlashcardOrderByWithRelationInput[];
    cursor?: Prisma.FlashcardWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FlashcardCountAggregateInputType;
    _min?: FlashcardMinAggregateInputType;
    _max?: FlashcardMaxAggregateInputType;
};
export type GetFlashcardAggregateType<T extends FlashcardAggregateArgs> = {
    [P in keyof T & keyof AggregateFlashcard]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFlashcard[P]> : Prisma.GetScalarType<T[P], AggregateFlashcard[P]>;
};
export type FlashcardGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlashcardWhereInput;
    orderBy?: Prisma.FlashcardOrderByWithAggregationInput | Prisma.FlashcardOrderByWithAggregationInput[];
    by: Prisma.FlashcardScalarFieldEnum[] | Prisma.FlashcardScalarFieldEnum;
    having?: Prisma.FlashcardScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FlashcardCountAggregateInputType | true;
    _min?: FlashcardMinAggregateInputType;
    _max?: FlashcardMaxAggregateInputType;
};
export type FlashcardGroupByOutputType = {
    id: string;
    word: string;
    kana: string;
    meaning: string;
    example: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FlashcardCountAggregateOutputType | null;
    _min: FlashcardMinAggregateOutputType | null;
    _max: FlashcardMaxAggregateOutputType | null;
};
type GetFlashcardGroupByPayload<T extends FlashcardGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FlashcardGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FlashcardGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FlashcardGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FlashcardGroupByOutputType[P]>;
}>>;
export type FlashcardWhereInput = {
    AND?: Prisma.FlashcardWhereInput | Prisma.FlashcardWhereInput[];
    OR?: Prisma.FlashcardWhereInput[];
    NOT?: Prisma.FlashcardWhereInput | Prisma.FlashcardWhereInput[];
    id?: Prisma.StringFilter<"Flashcard"> | string;
    word?: Prisma.StringFilter<"Flashcard"> | string;
    kana?: Prisma.StringFilter<"Flashcard"> | string;
    meaning?: Prisma.StringFilter<"Flashcard"> | string;
    example?: Prisma.StringNullableFilter<"Flashcard"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Flashcard"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Flashcard"> | Date | string;
    progress?: Prisma.FlashcardProgressListRelationFilter;
};
export type FlashcardOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    word?: Prisma.SortOrder;
    kana?: Prisma.SortOrder;
    meaning?: Prisma.SortOrder;
    example?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    progress?: Prisma.FlashcardProgressOrderByRelationAggregateInput;
};
export type FlashcardWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FlashcardWhereInput | Prisma.FlashcardWhereInput[];
    OR?: Prisma.FlashcardWhereInput[];
    NOT?: Prisma.FlashcardWhereInput | Prisma.FlashcardWhereInput[];
    word?: Prisma.StringFilter<"Flashcard"> | string;
    kana?: Prisma.StringFilter<"Flashcard"> | string;
    meaning?: Prisma.StringFilter<"Flashcard"> | string;
    example?: Prisma.StringNullableFilter<"Flashcard"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Flashcard"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Flashcard"> | Date | string;
    progress?: Prisma.FlashcardProgressListRelationFilter;
}, "id">;
export type FlashcardOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    word?: Prisma.SortOrder;
    kana?: Prisma.SortOrder;
    meaning?: Prisma.SortOrder;
    example?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FlashcardCountOrderByAggregateInput;
    _max?: Prisma.FlashcardMaxOrderByAggregateInput;
    _min?: Prisma.FlashcardMinOrderByAggregateInput;
};
export type FlashcardScalarWhereWithAggregatesInput = {
    AND?: Prisma.FlashcardScalarWhereWithAggregatesInput | Prisma.FlashcardScalarWhereWithAggregatesInput[];
    OR?: Prisma.FlashcardScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FlashcardScalarWhereWithAggregatesInput | Prisma.FlashcardScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Flashcard"> | string;
    word?: Prisma.StringWithAggregatesFilter<"Flashcard"> | string;
    kana?: Prisma.StringWithAggregatesFilter<"Flashcard"> | string;
    meaning?: Prisma.StringWithAggregatesFilter<"Flashcard"> | string;
    example?: Prisma.StringNullableWithAggregatesFilter<"Flashcard"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Flashcard"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Flashcard"> | Date | string;
};
export type FlashcardCreateInput = {
    id?: string;
    word: string;
    kana: string;
    meaning: string;
    example?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    progress?: Prisma.FlashcardProgressCreateNestedManyWithoutFlashcardInput;
};
export type FlashcardUncheckedCreateInput = {
    id?: string;
    word: string;
    kana: string;
    meaning: string;
    example?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    progress?: Prisma.FlashcardProgressUncheckedCreateNestedManyWithoutFlashcardInput;
};
export type FlashcardUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    word?: Prisma.StringFieldUpdateOperationsInput | string;
    kana?: Prisma.StringFieldUpdateOperationsInput | string;
    meaning?: Prisma.StringFieldUpdateOperationsInput | string;
    example?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    progress?: Prisma.FlashcardProgressUpdateManyWithoutFlashcardNestedInput;
};
export type FlashcardUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    word?: Prisma.StringFieldUpdateOperationsInput | string;
    kana?: Prisma.StringFieldUpdateOperationsInput | string;
    meaning?: Prisma.StringFieldUpdateOperationsInput | string;
    example?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    progress?: Prisma.FlashcardProgressUncheckedUpdateManyWithoutFlashcardNestedInput;
};
export type FlashcardCreateManyInput = {
    id?: string;
    word: string;
    kana: string;
    meaning: string;
    example?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    word?: Prisma.StringFieldUpdateOperationsInput | string;
    kana?: Prisma.StringFieldUpdateOperationsInput | string;
    meaning?: Prisma.StringFieldUpdateOperationsInput | string;
    example?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    word?: Prisma.StringFieldUpdateOperationsInput | string;
    kana?: Prisma.StringFieldUpdateOperationsInput | string;
    meaning?: Prisma.StringFieldUpdateOperationsInput | string;
    example?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    word?: Prisma.SortOrder;
    kana?: Prisma.SortOrder;
    meaning?: Prisma.SortOrder;
    example?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FlashcardMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    word?: Prisma.SortOrder;
    kana?: Prisma.SortOrder;
    meaning?: Prisma.SortOrder;
    example?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FlashcardMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    word?: Prisma.SortOrder;
    kana?: Prisma.SortOrder;
    meaning?: Prisma.SortOrder;
    example?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FlashcardScalarRelationFilter = {
    is?: Prisma.FlashcardWhereInput;
    isNot?: Prisma.FlashcardWhereInput;
};
export type FlashcardCreateNestedOneWithoutProgressInput = {
    create?: Prisma.XOR<Prisma.FlashcardCreateWithoutProgressInput, Prisma.FlashcardUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: Prisma.FlashcardCreateOrConnectWithoutProgressInput;
    connect?: Prisma.FlashcardWhereUniqueInput;
};
export type FlashcardUpdateOneRequiredWithoutProgressNestedInput = {
    create?: Prisma.XOR<Prisma.FlashcardCreateWithoutProgressInput, Prisma.FlashcardUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: Prisma.FlashcardCreateOrConnectWithoutProgressInput;
    upsert?: Prisma.FlashcardUpsertWithoutProgressInput;
    connect?: Prisma.FlashcardWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FlashcardUpdateToOneWithWhereWithoutProgressInput, Prisma.FlashcardUpdateWithoutProgressInput>, Prisma.FlashcardUncheckedUpdateWithoutProgressInput>;
};
export type FlashcardCreateWithoutProgressInput = {
    id?: string;
    word: string;
    kana: string;
    meaning: string;
    example?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardUncheckedCreateWithoutProgressInput = {
    id?: string;
    word: string;
    kana: string;
    meaning: string;
    example?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardCreateOrConnectWithoutProgressInput = {
    where: Prisma.FlashcardWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlashcardCreateWithoutProgressInput, Prisma.FlashcardUncheckedCreateWithoutProgressInput>;
};
export type FlashcardUpsertWithoutProgressInput = {
    update: Prisma.XOR<Prisma.FlashcardUpdateWithoutProgressInput, Prisma.FlashcardUncheckedUpdateWithoutProgressInput>;
    create: Prisma.XOR<Prisma.FlashcardCreateWithoutProgressInput, Prisma.FlashcardUncheckedCreateWithoutProgressInput>;
    where?: Prisma.FlashcardWhereInput;
};
export type FlashcardUpdateToOneWithWhereWithoutProgressInput = {
    where?: Prisma.FlashcardWhereInput;
    data: Prisma.XOR<Prisma.FlashcardUpdateWithoutProgressInput, Prisma.FlashcardUncheckedUpdateWithoutProgressInput>;
};
export type FlashcardUpdateWithoutProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    word?: Prisma.StringFieldUpdateOperationsInput | string;
    kana?: Prisma.StringFieldUpdateOperationsInput | string;
    meaning?: Prisma.StringFieldUpdateOperationsInput | string;
    example?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardUncheckedUpdateWithoutProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    word?: Prisma.StringFieldUpdateOperationsInput | string;
    kana?: Prisma.StringFieldUpdateOperationsInput | string;
    meaning?: Prisma.StringFieldUpdateOperationsInput | string;
    example?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardCountOutputType = {
    progress: number;
};
export type FlashcardCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    progress?: boolean | FlashcardCountOutputTypeCountProgressArgs;
};
export type FlashcardCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardCountOutputTypeSelect<ExtArgs> | null;
};
export type FlashcardCountOutputTypeCountProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlashcardProgressWhereInput;
};
export type FlashcardSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    word?: boolean;
    kana?: boolean;
    meaning?: boolean;
    example?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    progress?: boolean | Prisma.Flashcard$progressArgs<ExtArgs>;
    _count?: boolean | Prisma.FlashcardCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flashcard"]>;
export type FlashcardSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    word?: boolean;
    kana?: boolean;
    meaning?: boolean;
    example?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["flashcard"]>;
export type FlashcardSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    word?: boolean;
    kana?: boolean;
    meaning?: boolean;
    example?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["flashcard"]>;
export type FlashcardSelectScalar = {
    id?: boolean;
    word?: boolean;
    kana?: boolean;
    meaning?: boolean;
    example?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FlashcardOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "word" | "kana" | "meaning" | "example" | "createdAt" | "updatedAt", ExtArgs["result"]["flashcard"]>;
export type FlashcardInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    progress?: boolean | Prisma.Flashcard$progressArgs<ExtArgs>;
    _count?: boolean | Prisma.FlashcardCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FlashcardIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type FlashcardIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $FlashcardPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Flashcard";
    objects: {
        progress: Prisma.$FlashcardProgressPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        word: string;
        kana: string;
        meaning: string;
        example: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["flashcard"]>;
    composites: {};
};
export type FlashcardGetPayload<S extends boolean | null | undefined | FlashcardDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FlashcardPayload, S>;
export type FlashcardCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FlashcardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FlashcardCountAggregateInputType | true;
};
export interface FlashcardDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Flashcard'];
        meta: {
            name: 'Flashcard';
        };
    };
    findUnique<T extends FlashcardFindUniqueArgs>(args: Prisma.SelectSubset<T, FlashcardFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FlashcardFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FlashcardFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FlashcardFindFirstArgs>(args?: Prisma.SelectSubset<T, FlashcardFindFirstArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FlashcardFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FlashcardFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FlashcardFindManyArgs>(args?: Prisma.SelectSubset<T, FlashcardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FlashcardCreateArgs>(args: Prisma.SelectSubset<T, FlashcardCreateArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FlashcardCreateManyArgs>(args?: Prisma.SelectSubset<T, FlashcardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FlashcardCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FlashcardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FlashcardDeleteArgs>(args: Prisma.SelectSubset<T, FlashcardDeleteArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FlashcardUpdateArgs>(args: Prisma.SelectSubset<T, FlashcardUpdateArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FlashcardDeleteManyArgs>(args?: Prisma.SelectSubset<T, FlashcardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FlashcardUpdateManyArgs>(args: Prisma.SelectSubset<T, FlashcardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FlashcardUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FlashcardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FlashcardUpsertArgs>(args: Prisma.SelectSubset<T, FlashcardUpsertArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FlashcardCountArgs>(args?: Prisma.Subset<T, FlashcardCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FlashcardCountAggregateOutputType> : number>;
    aggregate<T extends FlashcardAggregateArgs>(args: Prisma.Subset<T, FlashcardAggregateArgs>): Prisma.PrismaPromise<GetFlashcardAggregateType<T>>;
    groupBy<T extends FlashcardGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FlashcardGroupByArgs['orderBy'];
    } : {
        orderBy?: FlashcardGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FlashcardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlashcardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FlashcardFieldRefs;
}
export interface Prisma__FlashcardClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    progress<T extends Prisma.Flashcard$progressArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Flashcard$progressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FlashcardFieldRefs {
    readonly id: Prisma.FieldRef<"Flashcard", 'String'>;
    readonly word: Prisma.FieldRef<"Flashcard", 'String'>;
    readonly kana: Prisma.FieldRef<"Flashcard", 'String'>;
    readonly meaning: Prisma.FieldRef<"Flashcard", 'String'>;
    readonly example: Prisma.FieldRef<"Flashcard", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Flashcard", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Flashcard", 'DateTime'>;
}
export type FlashcardFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    where: Prisma.FlashcardWhereUniqueInput;
};
export type FlashcardFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    where: Prisma.FlashcardWhereUniqueInput;
};
export type FlashcardFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    where?: Prisma.FlashcardWhereInput;
    orderBy?: Prisma.FlashcardOrderByWithRelationInput | Prisma.FlashcardOrderByWithRelationInput[];
    cursor?: Prisma.FlashcardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlashcardScalarFieldEnum | Prisma.FlashcardScalarFieldEnum[];
};
export type FlashcardFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    where?: Prisma.FlashcardWhereInput;
    orderBy?: Prisma.FlashcardOrderByWithRelationInput | Prisma.FlashcardOrderByWithRelationInput[];
    cursor?: Prisma.FlashcardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlashcardScalarFieldEnum | Prisma.FlashcardScalarFieldEnum[];
};
export type FlashcardFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    where?: Prisma.FlashcardWhereInput;
    orderBy?: Prisma.FlashcardOrderByWithRelationInput | Prisma.FlashcardOrderByWithRelationInput[];
    cursor?: Prisma.FlashcardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlashcardScalarFieldEnum | Prisma.FlashcardScalarFieldEnum[];
};
export type FlashcardCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FlashcardCreateInput, Prisma.FlashcardUncheckedCreateInput>;
};
export type FlashcardCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FlashcardCreateManyInput | Prisma.FlashcardCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FlashcardCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    data: Prisma.FlashcardCreateManyInput | Prisma.FlashcardCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FlashcardUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FlashcardUpdateInput, Prisma.FlashcardUncheckedUpdateInput>;
    where: Prisma.FlashcardWhereUniqueInput;
};
export type FlashcardUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FlashcardUpdateManyMutationInput, Prisma.FlashcardUncheckedUpdateManyInput>;
    where?: Prisma.FlashcardWhereInput;
    limit?: number;
};
export type FlashcardUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FlashcardUpdateManyMutationInput, Prisma.FlashcardUncheckedUpdateManyInput>;
    where?: Prisma.FlashcardWhereInput;
    limit?: number;
};
export type FlashcardUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    where: Prisma.FlashcardWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlashcardCreateInput, Prisma.FlashcardUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FlashcardUpdateInput, Prisma.FlashcardUncheckedUpdateInput>;
};
export type FlashcardDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
    where: Prisma.FlashcardWhereUniqueInput;
};
export type FlashcardDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlashcardWhereInput;
    limit?: number;
};
export type Flashcard$progressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FlashcardDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardOmit<ExtArgs> | null;
    include?: Prisma.FlashcardInclude<ExtArgs> | null;
};
export {};
