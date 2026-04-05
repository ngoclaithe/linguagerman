import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FlashcardProgressModel = runtime.Types.Result.DefaultSelection<Prisma.$FlashcardProgressPayload>;
export type AggregateFlashcardProgress = {
    _count: FlashcardProgressCountAggregateOutputType | null;
    _avg: FlashcardProgressAvgAggregateOutputType | null;
    _sum: FlashcardProgressSumAggregateOutputType | null;
    _min: FlashcardProgressMinAggregateOutputType | null;
    _max: FlashcardProgressMaxAggregateOutputType | null;
};
export type FlashcardProgressAvgAggregateOutputType = {
    reviewCount: number | null;
};
export type FlashcardProgressSumAggregateOutputType = {
    reviewCount: number | null;
};
export type FlashcardProgressMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    flashcardId: string | null;
    known: boolean | null;
    reviewCount: number | null;
    lastReviewedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FlashcardProgressMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    flashcardId: string | null;
    known: boolean | null;
    reviewCount: number | null;
    lastReviewedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FlashcardProgressCountAggregateOutputType = {
    id: number;
    userId: number;
    flashcardId: number;
    known: number;
    reviewCount: number;
    lastReviewedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FlashcardProgressAvgAggregateInputType = {
    reviewCount?: true;
};
export type FlashcardProgressSumAggregateInputType = {
    reviewCount?: true;
};
export type FlashcardProgressMinAggregateInputType = {
    id?: true;
    userId?: true;
    flashcardId?: true;
    known?: true;
    reviewCount?: true;
    lastReviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FlashcardProgressMaxAggregateInputType = {
    id?: true;
    userId?: true;
    flashcardId?: true;
    known?: true;
    reviewCount?: true;
    lastReviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FlashcardProgressCountAggregateInputType = {
    id?: true;
    userId?: true;
    flashcardId?: true;
    known?: true;
    reviewCount?: true;
    lastReviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FlashcardProgressAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlashcardProgressWhereInput;
    orderBy?: Prisma.FlashcardProgressOrderByWithRelationInput | Prisma.FlashcardProgressOrderByWithRelationInput[];
    cursor?: Prisma.FlashcardProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FlashcardProgressCountAggregateInputType;
    _avg?: FlashcardProgressAvgAggregateInputType;
    _sum?: FlashcardProgressSumAggregateInputType;
    _min?: FlashcardProgressMinAggregateInputType;
    _max?: FlashcardProgressMaxAggregateInputType;
};
export type GetFlashcardProgressAggregateType<T extends FlashcardProgressAggregateArgs> = {
    [P in keyof T & keyof AggregateFlashcardProgress]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFlashcardProgress[P]> : Prisma.GetScalarType<T[P], AggregateFlashcardProgress[P]>;
};
export type FlashcardProgressGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlashcardProgressWhereInput;
    orderBy?: Prisma.FlashcardProgressOrderByWithAggregationInput | Prisma.FlashcardProgressOrderByWithAggregationInput[];
    by: Prisma.FlashcardProgressScalarFieldEnum[] | Prisma.FlashcardProgressScalarFieldEnum;
    having?: Prisma.FlashcardProgressScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FlashcardProgressCountAggregateInputType | true;
    _avg?: FlashcardProgressAvgAggregateInputType;
    _sum?: FlashcardProgressSumAggregateInputType;
    _min?: FlashcardProgressMinAggregateInputType;
    _max?: FlashcardProgressMaxAggregateInputType;
};
export type FlashcardProgressGroupByOutputType = {
    id: string;
    userId: string;
    flashcardId: string;
    known: boolean;
    reviewCount: number;
    lastReviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FlashcardProgressCountAggregateOutputType | null;
    _avg: FlashcardProgressAvgAggregateOutputType | null;
    _sum: FlashcardProgressSumAggregateOutputType | null;
    _min: FlashcardProgressMinAggregateOutputType | null;
    _max: FlashcardProgressMaxAggregateOutputType | null;
};
type GetFlashcardProgressGroupByPayload<T extends FlashcardProgressGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FlashcardProgressGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FlashcardProgressGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FlashcardProgressGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FlashcardProgressGroupByOutputType[P]>;
}>>;
export type FlashcardProgressWhereInput = {
    AND?: Prisma.FlashcardProgressWhereInput | Prisma.FlashcardProgressWhereInput[];
    OR?: Prisma.FlashcardProgressWhereInput[];
    NOT?: Prisma.FlashcardProgressWhereInput | Prisma.FlashcardProgressWhereInput[];
    id?: Prisma.StringFilter<"FlashcardProgress"> | string;
    userId?: Prisma.StringFilter<"FlashcardProgress"> | string;
    flashcardId?: Prisma.StringFilter<"FlashcardProgress"> | string;
    known?: Prisma.BoolFilter<"FlashcardProgress"> | boolean;
    reviewCount?: Prisma.IntFilter<"FlashcardProgress"> | number;
    lastReviewedAt?: Prisma.DateTimeNullableFilter<"FlashcardProgress"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FlashcardProgress"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FlashcardProgress"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    flashcard?: Prisma.XOR<Prisma.FlashcardScalarRelationFilter, Prisma.FlashcardWhereInput>;
};
export type FlashcardProgressOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    flashcardId?: Prisma.SortOrder;
    known?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    lastReviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    flashcard?: Prisma.FlashcardOrderByWithRelationInput;
};
export type FlashcardProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_flashcardId?: Prisma.FlashcardProgressUserIdFlashcardIdCompoundUniqueInput;
    AND?: Prisma.FlashcardProgressWhereInput | Prisma.FlashcardProgressWhereInput[];
    OR?: Prisma.FlashcardProgressWhereInput[];
    NOT?: Prisma.FlashcardProgressWhereInput | Prisma.FlashcardProgressWhereInput[];
    userId?: Prisma.StringFilter<"FlashcardProgress"> | string;
    flashcardId?: Prisma.StringFilter<"FlashcardProgress"> | string;
    known?: Prisma.BoolFilter<"FlashcardProgress"> | boolean;
    reviewCount?: Prisma.IntFilter<"FlashcardProgress"> | number;
    lastReviewedAt?: Prisma.DateTimeNullableFilter<"FlashcardProgress"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FlashcardProgress"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FlashcardProgress"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    flashcard?: Prisma.XOR<Prisma.FlashcardScalarRelationFilter, Prisma.FlashcardWhereInput>;
}, "id" | "userId_flashcardId">;
export type FlashcardProgressOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    flashcardId?: Prisma.SortOrder;
    known?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    lastReviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FlashcardProgressCountOrderByAggregateInput;
    _avg?: Prisma.FlashcardProgressAvgOrderByAggregateInput;
    _max?: Prisma.FlashcardProgressMaxOrderByAggregateInput;
    _min?: Prisma.FlashcardProgressMinOrderByAggregateInput;
    _sum?: Prisma.FlashcardProgressSumOrderByAggregateInput;
};
export type FlashcardProgressScalarWhereWithAggregatesInput = {
    AND?: Prisma.FlashcardProgressScalarWhereWithAggregatesInput | Prisma.FlashcardProgressScalarWhereWithAggregatesInput[];
    OR?: Prisma.FlashcardProgressScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FlashcardProgressScalarWhereWithAggregatesInput | Prisma.FlashcardProgressScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FlashcardProgress"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"FlashcardProgress"> | string;
    flashcardId?: Prisma.StringWithAggregatesFilter<"FlashcardProgress"> | string;
    known?: Prisma.BoolWithAggregatesFilter<"FlashcardProgress"> | boolean;
    reviewCount?: Prisma.IntWithAggregatesFilter<"FlashcardProgress"> | number;
    lastReviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FlashcardProgress"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FlashcardProgress"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FlashcardProgress"> | Date | string;
};
export type FlashcardProgressCreateInput = {
    id?: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFlashcardProgressInput;
    flashcard: Prisma.FlashcardCreateNestedOneWithoutProgressInput;
};
export type FlashcardProgressUncheckedCreateInput = {
    id?: string;
    userId: string;
    flashcardId: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardProgressUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFlashcardProgressNestedInput;
    flashcard?: Prisma.FlashcardUpdateOneRequiredWithoutProgressNestedInput;
};
export type FlashcardProgressUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    flashcardId?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardProgressCreateManyInput = {
    id?: string;
    userId: string;
    flashcardId: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardProgressUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardProgressUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    flashcardId?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardProgressListRelationFilter = {
    every?: Prisma.FlashcardProgressWhereInput;
    some?: Prisma.FlashcardProgressWhereInput;
    none?: Prisma.FlashcardProgressWhereInput;
};
export type FlashcardProgressOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FlashcardProgressUserIdFlashcardIdCompoundUniqueInput = {
    userId: string;
    flashcardId: string;
};
export type FlashcardProgressCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    flashcardId?: Prisma.SortOrder;
    known?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    lastReviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FlashcardProgressAvgOrderByAggregateInput = {
    reviewCount?: Prisma.SortOrder;
};
export type FlashcardProgressMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    flashcardId?: Prisma.SortOrder;
    known?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    lastReviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FlashcardProgressMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    flashcardId?: Prisma.SortOrder;
    known?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    lastReviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FlashcardProgressSumOrderByAggregateInput = {
    reviewCount?: Prisma.SortOrder;
};
export type FlashcardProgressCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutUserInput, Prisma.FlashcardProgressUncheckedCreateWithoutUserInput> | Prisma.FlashcardProgressCreateWithoutUserInput[] | Prisma.FlashcardProgressUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FlashcardProgressCreateOrConnectWithoutUserInput | Prisma.FlashcardProgressCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FlashcardProgressCreateManyUserInputEnvelope;
    connect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
};
export type FlashcardProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutUserInput, Prisma.FlashcardProgressUncheckedCreateWithoutUserInput> | Prisma.FlashcardProgressCreateWithoutUserInput[] | Prisma.FlashcardProgressUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FlashcardProgressCreateOrConnectWithoutUserInput | Prisma.FlashcardProgressCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FlashcardProgressCreateManyUserInputEnvelope;
    connect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
};
export type FlashcardProgressUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutUserInput, Prisma.FlashcardProgressUncheckedCreateWithoutUserInput> | Prisma.FlashcardProgressCreateWithoutUserInput[] | Prisma.FlashcardProgressUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FlashcardProgressCreateOrConnectWithoutUserInput | Prisma.FlashcardProgressCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FlashcardProgressUpsertWithWhereUniqueWithoutUserInput | Prisma.FlashcardProgressUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FlashcardProgressCreateManyUserInputEnvelope;
    set?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    disconnect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    delete?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    connect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    update?: Prisma.FlashcardProgressUpdateWithWhereUniqueWithoutUserInput | Prisma.FlashcardProgressUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FlashcardProgressUpdateManyWithWhereWithoutUserInput | Prisma.FlashcardProgressUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FlashcardProgressScalarWhereInput | Prisma.FlashcardProgressScalarWhereInput[];
};
export type FlashcardProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutUserInput, Prisma.FlashcardProgressUncheckedCreateWithoutUserInput> | Prisma.FlashcardProgressCreateWithoutUserInput[] | Prisma.FlashcardProgressUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FlashcardProgressCreateOrConnectWithoutUserInput | Prisma.FlashcardProgressCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FlashcardProgressUpsertWithWhereUniqueWithoutUserInput | Prisma.FlashcardProgressUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FlashcardProgressCreateManyUserInputEnvelope;
    set?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    disconnect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    delete?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    connect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    update?: Prisma.FlashcardProgressUpdateWithWhereUniqueWithoutUserInput | Prisma.FlashcardProgressUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FlashcardProgressUpdateManyWithWhereWithoutUserInput | Prisma.FlashcardProgressUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FlashcardProgressScalarWhereInput | Prisma.FlashcardProgressScalarWhereInput[];
};
export type FlashcardProgressCreateNestedManyWithoutFlashcardInput = {
    create?: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutFlashcardInput, Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput> | Prisma.FlashcardProgressCreateWithoutFlashcardInput[] | Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput[];
    connectOrCreate?: Prisma.FlashcardProgressCreateOrConnectWithoutFlashcardInput | Prisma.FlashcardProgressCreateOrConnectWithoutFlashcardInput[];
    createMany?: Prisma.FlashcardProgressCreateManyFlashcardInputEnvelope;
    connect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
};
export type FlashcardProgressUncheckedCreateNestedManyWithoutFlashcardInput = {
    create?: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutFlashcardInput, Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput> | Prisma.FlashcardProgressCreateWithoutFlashcardInput[] | Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput[];
    connectOrCreate?: Prisma.FlashcardProgressCreateOrConnectWithoutFlashcardInput | Prisma.FlashcardProgressCreateOrConnectWithoutFlashcardInput[];
    createMany?: Prisma.FlashcardProgressCreateManyFlashcardInputEnvelope;
    connect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
};
export type FlashcardProgressUpdateManyWithoutFlashcardNestedInput = {
    create?: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutFlashcardInput, Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput> | Prisma.FlashcardProgressCreateWithoutFlashcardInput[] | Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput[];
    connectOrCreate?: Prisma.FlashcardProgressCreateOrConnectWithoutFlashcardInput | Prisma.FlashcardProgressCreateOrConnectWithoutFlashcardInput[];
    upsert?: Prisma.FlashcardProgressUpsertWithWhereUniqueWithoutFlashcardInput | Prisma.FlashcardProgressUpsertWithWhereUniqueWithoutFlashcardInput[];
    createMany?: Prisma.FlashcardProgressCreateManyFlashcardInputEnvelope;
    set?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    disconnect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    delete?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    connect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    update?: Prisma.FlashcardProgressUpdateWithWhereUniqueWithoutFlashcardInput | Prisma.FlashcardProgressUpdateWithWhereUniqueWithoutFlashcardInput[];
    updateMany?: Prisma.FlashcardProgressUpdateManyWithWhereWithoutFlashcardInput | Prisma.FlashcardProgressUpdateManyWithWhereWithoutFlashcardInput[];
    deleteMany?: Prisma.FlashcardProgressScalarWhereInput | Prisma.FlashcardProgressScalarWhereInput[];
};
export type FlashcardProgressUncheckedUpdateManyWithoutFlashcardNestedInput = {
    create?: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutFlashcardInput, Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput> | Prisma.FlashcardProgressCreateWithoutFlashcardInput[] | Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput[];
    connectOrCreate?: Prisma.FlashcardProgressCreateOrConnectWithoutFlashcardInput | Prisma.FlashcardProgressCreateOrConnectWithoutFlashcardInput[];
    upsert?: Prisma.FlashcardProgressUpsertWithWhereUniqueWithoutFlashcardInput | Prisma.FlashcardProgressUpsertWithWhereUniqueWithoutFlashcardInput[];
    createMany?: Prisma.FlashcardProgressCreateManyFlashcardInputEnvelope;
    set?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    disconnect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    delete?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    connect?: Prisma.FlashcardProgressWhereUniqueInput | Prisma.FlashcardProgressWhereUniqueInput[];
    update?: Prisma.FlashcardProgressUpdateWithWhereUniqueWithoutFlashcardInput | Prisma.FlashcardProgressUpdateWithWhereUniqueWithoutFlashcardInput[];
    updateMany?: Prisma.FlashcardProgressUpdateManyWithWhereWithoutFlashcardInput | Prisma.FlashcardProgressUpdateManyWithWhereWithoutFlashcardInput[];
    deleteMany?: Prisma.FlashcardProgressScalarWhereInput | Prisma.FlashcardProgressScalarWhereInput[];
};
export type FlashcardProgressCreateWithoutUserInput = {
    id?: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    flashcard: Prisma.FlashcardCreateNestedOneWithoutProgressInput;
};
export type FlashcardProgressUncheckedCreateWithoutUserInput = {
    id?: string;
    flashcardId: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardProgressCreateOrConnectWithoutUserInput = {
    where: Prisma.FlashcardProgressWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutUserInput, Prisma.FlashcardProgressUncheckedCreateWithoutUserInput>;
};
export type FlashcardProgressCreateManyUserInputEnvelope = {
    data: Prisma.FlashcardProgressCreateManyUserInput | Prisma.FlashcardProgressCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FlashcardProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FlashcardProgressWhereUniqueInput;
    update: Prisma.XOR<Prisma.FlashcardProgressUpdateWithoutUserInput, Prisma.FlashcardProgressUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutUserInput, Prisma.FlashcardProgressUncheckedCreateWithoutUserInput>;
};
export type FlashcardProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FlashcardProgressWhereUniqueInput;
    data: Prisma.XOR<Prisma.FlashcardProgressUpdateWithoutUserInput, Prisma.FlashcardProgressUncheckedUpdateWithoutUserInput>;
};
export type FlashcardProgressUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FlashcardProgressScalarWhereInput;
    data: Prisma.XOR<Prisma.FlashcardProgressUpdateManyMutationInput, Prisma.FlashcardProgressUncheckedUpdateManyWithoutUserInput>;
};
export type FlashcardProgressScalarWhereInput = {
    AND?: Prisma.FlashcardProgressScalarWhereInput | Prisma.FlashcardProgressScalarWhereInput[];
    OR?: Prisma.FlashcardProgressScalarWhereInput[];
    NOT?: Prisma.FlashcardProgressScalarWhereInput | Prisma.FlashcardProgressScalarWhereInput[];
    id?: Prisma.StringFilter<"FlashcardProgress"> | string;
    userId?: Prisma.StringFilter<"FlashcardProgress"> | string;
    flashcardId?: Prisma.StringFilter<"FlashcardProgress"> | string;
    known?: Prisma.BoolFilter<"FlashcardProgress"> | boolean;
    reviewCount?: Prisma.IntFilter<"FlashcardProgress"> | number;
    lastReviewedAt?: Prisma.DateTimeNullableFilter<"FlashcardProgress"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FlashcardProgress"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FlashcardProgress"> | Date | string;
};
export type FlashcardProgressCreateWithoutFlashcardInput = {
    id?: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFlashcardProgressInput;
};
export type FlashcardProgressUncheckedCreateWithoutFlashcardInput = {
    id?: string;
    userId: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardProgressCreateOrConnectWithoutFlashcardInput = {
    where: Prisma.FlashcardProgressWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutFlashcardInput, Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput>;
};
export type FlashcardProgressCreateManyFlashcardInputEnvelope = {
    data: Prisma.FlashcardProgressCreateManyFlashcardInput | Prisma.FlashcardProgressCreateManyFlashcardInput[];
    skipDuplicates?: boolean;
};
export type FlashcardProgressUpsertWithWhereUniqueWithoutFlashcardInput = {
    where: Prisma.FlashcardProgressWhereUniqueInput;
    update: Prisma.XOR<Prisma.FlashcardProgressUpdateWithoutFlashcardInput, Prisma.FlashcardProgressUncheckedUpdateWithoutFlashcardInput>;
    create: Prisma.XOR<Prisma.FlashcardProgressCreateWithoutFlashcardInput, Prisma.FlashcardProgressUncheckedCreateWithoutFlashcardInput>;
};
export type FlashcardProgressUpdateWithWhereUniqueWithoutFlashcardInput = {
    where: Prisma.FlashcardProgressWhereUniqueInput;
    data: Prisma.XOR<Prisma.FlashcardProgressUpdateWithoutFlashcardInput, Prisma.FlashcardProgressUncheckedUpdateWithoutFlashcardInput>;
};
export type FlashcardProgressUpdateManyWithWhereWithoutFlashcardInput = {
    where: Prisma.FlashcardProgressScalarWhereInput;
    data: Prisma.XOR<Prisma.FlashcardProgressUpdateManyMutationInput, Prisma.FlashcardProgressUncheckedUpdateManyWithoutFlashcardInput>;
};
export type FlashcardProgressCreateManyUserInput = {
    id?: string;
    flashcardId: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardProgressUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    flashcard?: Prisma.FlashcardUpdateOneRequiredWithoutProgressNestedInput;
};
export type FlashcardProgressUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flashcardId?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardProgressUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flashcardId?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardProgressCreateManyFlashcardInput = {
    id?: string;
    userId: string;
    known?: boolean;
    reviewCount?: number;
    lastReviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FlashcardProgressUpdateWithoutFlashcardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFlashcardProgressNestedInput;
};
export type FlashcardProgressUncheckedUpdateWithoutFlashcardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardProgressUncheckedUpdateManyWithoutFlashcardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    known?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastReviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FlashcardProgressSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    flashcardId?: boolean;
    known?: boolean;
    reviewCount?: boolean;
    lastReviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    flashcard?: boolean | Prisma.FlashcardDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flashcardProgress"]>;
export type FlashcardProgressSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    flashcardId?: boolean;
    known?: boolean;
    reviewCount?: boolean;
    lastReviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    flashcard?: boolean | Prisma.FlashcardDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flashcardProgress"]>;
export type FlashcardProgressSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    flashcardId?: boolean;
    known?: boolean;
    reviewCount?: boolean;
    lastReviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    flashcard?: boolean | Prisma.FlashcardDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flashcardProgress"]>;
export type FlashcardProgressSelectScalar = {
    id?: boolean;
    userId?: boolean;
    flashcardId?: boolean;
    known?: boolean;
    reviewCount?: boolean;
    lastReviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FlashcardProgressOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "flashcardId" | "known" | "reviewCount" | "lastReviewedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["flashcardProgress"]>;
export type FlashcardProgressInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    flashcard?: boolean | Prisma.FlashcardDefaultArgs<ExtArgs>;
};
export type FlashcardProgressIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    flashcard?: boolean | Prisma.FlashcardDefaultArgs<ExtArgs>;
};
export type FlashcardProgressIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    flashcard?: boolean | Prisma.FlashcardDefaultArgs<ExtArgs>;
};
export type $FlashcardProgressPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FlashcardProgress";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        flashcard: Prisma.$FlashcardPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        flashcardId: string;
        known: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["flashcardProgress"]>;
    composites: {};
};
export type FlashcardProgressGetPayload<S extends boolean | null | undefined | FlashcardProgressDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload, S>;
export type FlashcardProgressCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FlashcardProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FlashcardProgressCountAggregateInputType | true;
};
export interface FlashcardProgressDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FlashcardProgress'];
        meta: {
            name: 'FlashcardProgress';
        };
    };
    findUnique<T extends FlashcardProgressFindUniqueArgs>(args: Prisma.SelectSubset<T, FlashcardProgressFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FlashcardProgressClient<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FlashcardProgressFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FlashcardProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlashcardProgressClient<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FlashcardProgressFindFirstArgs>(args?: Prisma.SelectSubset<T, FlashcardProgressFindFirstArgs<ExtArgs>>): Prisma.Prisma__FlashcardProgressClient<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FlashcardProgressFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FlashcardProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FlashcardProgressClient<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FlashcardProgressFindManyArgs>(args?: Prisma.SelectSubset<T, FlashcardProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FlashcardProgressCreateArgs>(args: Prisma.SelectSubset<T, FlashcardProgressCreateArgs<ExtArgs>>): Prisma.Prisma__FlashcardProgressClient<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FlashcardProgressCreateManyArgs>(args?: Prisma.SelectSubset<T, FlashcardProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FlashcardProgressCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FlashcardProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FlashcardProgressDeleteArgs>(args: Prisma.SelectSubset<T, FlashcardProgressDeleteArgs<ExtArgs>>): Prisma.Prisma__FlashcardProgressClient<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FlashcardProgressUpdateArgs>(args: Prisma.SelectSubset<T, FlashcardProgressUpdateArgs<ExtArgs>>): Prisma.Prisma__FlashcardProgressClient<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FlashcardProgressDeleteManyArgs>(args?: Prisma.SelectSubset<T, FlashcardProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FlashcardProgressUpdateManyArgs>(args: Prisma.SelectSubset<T, FlashcardProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FlashcardProgressUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FlashcardProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FlashcardProgressUpsertArgs>(args: Prisma.SelectSubset<T, FlashcardProgressUpsertArgs<ExtArgs>>): Prisma.Prisma__FlashcardProgressClient<runtime.Types.Result.GetResult<Prisma.$FlashcardProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FlashcardProgressCountArgs>(args?: Prisma.Subset<T, FlashcardProgressCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FlashcardProgressCountAggregateOutputType> : number>;
    aggregate<T extends FlashcardProgressAggregateArgs>(args: Prisma.Subset<T, FlashcardProgressAggregateArgs>): Prisma.PrismaPromise<GetFlashcardProgressAggregateType<T>>;
    groupBy<T extends FlashcardProgressGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FlashcardProgressGroupByArgs['orderBy'];
    } : {
        orderBy?: FlashcardProgressGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FlashcardProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlashcardProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FlashcardProgressFieldRefs;
}
export interface Prisma__FlashcardProgressClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    flashcard<T extends Prisma.FlashcardDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FlashcardDefaultArgs<ExtArgs>>): Prisma.Prisma__FlashcardClient<runtime.Types.Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FlashcardProgressFieldRefs {
    readonly id: Prisma.FieldRef<"FlashcardProgress", 'String'>;
    readonly userId: Prisma.FieldRef<"FlashcardProgress", 'String'>;
    readonly flashcardId: Prisma.FieldRef<"FlashcardProgress", 'String'>;
    readonly known: Prisma.FieldRef<"FlashcardProgress", 'Boolean'>;
    readonly reviewCount: Prisma.FieldRef<"FlashcardProgress", 'Int'>;
    readonly lastReviewedAt: Prisma.FieldRef<"FlashcardProgress", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"FlashcardProgress", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FlashcardProgress", 'DateTime'>;
}
export type FlashcardProgressFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    include?: Prisma.FlashcardProgressInclude<ExtArgs> | null;
    where: Prisma.FlashcardProgressWhereUniqueInput;
};
export type FlashcardProgressFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    include?: Prisma.FlashcardProgressInclude<ExtArgs> | null;
    where: Prisma.FlashcardProgressWhereUniqueInput;
};
export type FlashcardProgressFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FlashcardProgressFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FlashcardProgressFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FlashcardProgressCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    include?: Prisma.FlashcardProgressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FlashcardProgressCreateInput, Prisma.FlashcardProgressUncheckedCreateInput>;
};
export type FlashcardProgressCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FlashcardProgressCreateManyInput | Prisma.FlashcardProgressCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FlashcardProgressCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    data: Prisma.FlashcardProgressCreateManyInput | Prisma.FlashcardProgressCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FlashcardProgressIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FlashcardProgressUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    include?: Prisma.FlashcardProgressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FlashcardProgressUpdateInput, Prisma.FlashcardProgressUncheckedUpdateInput>;
    where: Prisma.FlashcardProgressWhereUniqueInput;
};
export type FlashcardProgressUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FlashcardProgressUpdateManyMutationInput, Prisma.FlashcardProgressUncheckedUpdateManyInput>;
    where?: Prisma.FlashcardProgressWhereInput;
    limit?: number;
};
export type FlashcardProgressUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FlashcardProgressUpdateManyMutationInput, Prisma.FlashcardProgressUncheckedUpdateManyInput>;
    where?: Prisma.FlashcardProgressWhereInput;
    limit?: number;
    include?: Prisma.FlashcardProgressIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FlashcardProgressUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    include?: Prisma.FlashcardProgressInclude<ExtArgs> | null;
    where: Prisma.FlashcardProgressWhereUniqueInput;
    create: Prisma.XOR<Prisma.FlashcardProgressCreateInput, Prisma.FlashcardProgressUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FlashcardProgressUpdateInput, Prisma.FlashcardProgressUncheckedUpdateInput>;
};
export type FlashcardProgressDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    include?: Prisma.FlashcardProgressInclude<ExtArgs> | null;
    where: Prisma.FlashcardProgressWhereUniqueInput;
};
export type FlashcardProgressDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FlashcardProgressWhereInput;
    limit?: number;
};
export type FlashcardProgressDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FlashcardProgressSelect<ExtArgs> | null;
    omit?: Prisma.FlashcardProgressOmit<ExtArgs> | null;
    include?: Prisma.FlashcardProgressInclude<ExtArgs> | null;
};
export {};
