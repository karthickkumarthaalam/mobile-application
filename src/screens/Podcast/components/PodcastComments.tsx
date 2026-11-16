import React, { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, LockKeyhole, MessageCircle, Send, UserRound } from "lucide-react-native";

import { getPodcastComments, postPodcastComment } from "../../../api/podcast.api";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import AppText from "../../../components/Text/AppText";
import { COLORS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { useAuth } from "../../../providers/AuthProvider";
import { useThemedStyles } from "../../../providers/ThemeProvider";
import {
    PodcastComment,
    PodcastCommentsResponse,
    PostPodcastCommentParams,
} from "../../../types/podcast";

interface PodcastCommentsProps {
    podcastId: number;
}

function getCommentAuthor(comment: PodcastComment): string {
    return comment.Member?.name?.trim() || comment.guest_name?.trim() || "Thaalam listener";
}

function formatCommentDate(value?: string | null): string {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function getErrorMessage(error: unknown): string {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = error.response;
        if (
            typeof response === "object" &&
            response !== null &&
            "data" in response &&
            typeof response.data === "object" &&
            response.data !== null &&
            "message" in response.data &&
            typeof response.data.message === "string"
        ) {
            return response.data.message;
        }
    }
    if (error instanceof Error) return error.message;
    return "Something went wrong. Please try again.";
}

export default function PodcastComments({ podcastId }: PodcastCommentsProps) {
    const styles = useThemedStyles(createStyles);
    const {
        isAuthenticated,
        isLoading: authLoading,
        session,
        openAuthSheet,
    } = useAuth();
    const member = isAuthenticated ? session.member : null;
    const [commentText, setCommentText] = useState("");
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const commentsQuery = useQuery<PodcastCommentsResponse>({
        queryKey: ["podcast", "comments", podcastId],
        queryFn: ({ signal }) => getPodcastComments(podcastId, signal),
        enabled: Number.isFinite(podcastId) && podcastId > 0,
        staleTime: 60 * 1000,
        retry: 1,
    });

    const commentMutation = useMutation<void, unknown, PostPodcastCommentParams>({
        mutationFn: postPodcastComment,
        onSuccess: () => {
            setCommentText("");
            setFormError("");
            setSuccessMessage("Your comment was submitted for review.");
        },
        onError: (error) => {
            setFormError(getErrorMessage(error));
        },
    });

    const handleSubmit = () => {
        const comment = commentText.trim();
        setFormError("");
        setSuccessMessage("");

        if (!member?.memberId) {
            setFormError("Please sign in to join the conversation.");
            return;
        }
        if (!comment) {
            setFormError("Write a comment before submitting.");
            return;
        }

        commentMutation.mutate({
            podcastId,
            memberId: member.memberId,
            comment,
        });
    };

    const comments = commentsQuery.data?.comments ?? [];
    const total = commentsQuery.data?.total ?? comments.length;

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <View style={styles.headerIcon}>
                    <MessageCircle size={19} color={COLORS.primaryBright} />
                </View>
                <View style={styles.headerCopy}>
                    <AppText
                        variant="small"
                        weight="700"
                        color={COLORS.primaryBright}
                        style={styles.eyebrow}
                    >
                        LISTENER COMMUNITY
                    </AppText>
                    <AppText variant="subHeading" weight="700">
                        Join the conversation
                    </AppText>
                </View>
                <View style={styles.countBadge}>
                    <AppText variant="small" weight="700" color={COLORS.primaryBright}>
                        {total}
                    </AppText>
                </View>
            </View>

            {authLoading ? (
                <View style={styles.authLoading}>
                    <ActivityIndicator color={COLORS.primaryBright} />
                    <AppText variant="small" color={COLORS.textSecondary} style={styles.authLoadingText}>
                        Checking your account...
                    </AppText>
                </View>
            ) : member ? (
                <View style={styles.composer}>
                    <View style={styles.memberRow}>

                        <View style={styles.memberCopy}>
                            <AppText variant="caption" weight="700" numberOfLines={1}>
                                {member.name || "Thaalam member"}
                            </AppText>
                            <AppText variant="small" color={COLORS.textMuted}>
                                Sharing as a Thaalam member
                            </AppText>
                        </View>
                        <LockKeyhole size={15} color={COLORS.textMuted} />
                    </View>

                    <TextInput
                        value={commentText}
                        onChangeText={(value) => {
                            setCommentText(value);
                            if (formError) setFormError("");
                            if (successMessage) setSuccessMessage("");
                        }}
                        placeholder="Share your thoughts about this episode..."
                        placeholderTextColor={COLORS.textMuted}
                        accessibilityLabel="Write a comment"
                        multiline
                        textAlignVertical="top"
                        maxLength={2000}
                        editable={!commentMutation.isPending}
                        style={styles.commentInput}
                    />
                    <View style={styles.composerFooter}>
                        <AppText variant="small" color={COLORS.textMuted} style={styles.reviewNote}>
                            Comments are reviewed before appearing.
                        </AppText>
                        <AppText variant="small" color={COLORS.textMuted}>
                            {commentText.length}/2000
                        </AppText>
                    </View>
                    <PrimaryButton
                        title="Post comment"
                        size="md"
                        loading={commentMutation.isPending}
                        disabled={commentMutation.isPending}
                        leftIcon={<Send size={16} color={COLORS.white} />}
                        onPress={handleSubmit}
                        style={styles.submitButton}
                    />
                    {!!formError && (
                        <AppText variant="small" color={COLORS.error} style={styles.formMessage}>
                            {formError}
                        </AppText>
                    )}
                    {!!successMessage && (
                        <AppText variant="small" color={COLORS.success} style={styles.formMessage}>
                            {successMessage}
                        </AppText>
                    )}
                </View>
            ) : (
                <View style={styles.signInCard}>
                    <View style={styles.signInIcon}>
                        <LockKeyhole size={20} color={COLORS.primaryBright} />
                    </View>
                    <AppText variant="body" weight="700" align="center" style={styles.signInTitle}>
                        Unlock more with Thaalam
                    </AppText>
                    <AppText
                        variant="small"
                        color={COLORS.textSecondary}
                        align="center"
                        style={styles.signInDescription}
                    >
                        Sign in or create a free account to take part in the listener community.
                    </AppText>
                    <View style={styles.benefitList}>
                        <View style={styles.benefitRow}>
                            <CheckCircle2 size={16} color={COLORS.primaryBright} />
                            <AppText variant="small" color={COLORS.textSecondary} style={styles.benefitText}>
                                Post comments with your profile
                            </AppText>
                        </View>
                        <View style={styles.benefitRow}>
                            <CheckCircle2 size={16} color={COLORS.primaryBright} />
                            <AppText variant="small" color={COLORS.textSecondary} style={styles.benefitText}>
                                Keep your Thaalam experience connected
                            </AppText>
                        </View>
                        <View style={styles.benefitRow}>
                            <CheckCircle2 size={16} color={COLORS.primaryBright} />
                            <AppText variant="small" color={COLORS.textSecondary} style={styles.benefitText}>
                                Explore member features across the app
                            </AppText>
                        </View>
                    </View>
                    <PrimaryButton
                        title="Sign in"
                        size="md"
                        onPress={() => openAuthSheet("login")}
                        rightIcon={<ArrowRight size={17} color={COLORS.white} />}
                        style={styles.authButton}
                    />
                    <Pressable
                        onPress={() => openAuthSheet("register")}
                        accessibilityRole="button"
                        style={({ pressed }) => [styles.createAccountButton, pressed && styles.pressed]}
                    >
                        <AppText variant="small" weight="700" color={COLORS.primaryBright}>
                            Create a free account
                        </AppText>
                    </Pressable>
                </View>
            )}

            <View style={styles.divider} />

            <View style={styles.commentsHeading}>
                <AppText variant="body" weight="700">
                    Listener comments
                </AppText>
                <AppText variant="small" color={COLORS.textSecondary}>
                    {total} {total === 1 ? "comment" : "comments"}
                </AppText>
            </View>

            {commentsQuery.isLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={COLORS.primaryBright} />
                    <AppText variant="small" color={COLORS.textSecondary} style={styles.loadingText}>
                        Loading comments...
                    </AppText>
                </View>
            ) : commentsQuery.isError ? (
                <View style={styles.queryError}>
                    <AppText variant="small" color={COLORS.error} style={styles.queryErrorText}>
                        {getErrorMessage(commentsQuery.error)}
                    </AppText>
                    <Pressable
                        onPress={() => void commentsQuery.refetch()}
                        accessibilityRole="button"
                    >
                        <AppText variant="small" weight="700" color={COLORS.primaryBright}>
                            Try again
                        </AppText>
                    </Pressable>
                </View>
            ) : comments.length > 0 ? (
                <View>
                    {comments.map((comment, index) => (
                        <CommentItem
                            key={comment.id ?? comment.comment_id ?? `${getCommentAuthor(comment)}-${index}`}
                            comment={comment}
                            isLast={index === comments.length - 1}
                            styles={styles}
                        />
                    ))}
                </View>
            ) : (
                <View style={styles.emptyComments}>
                    <MessageCircle size={22} color={COLORS.primaryBright} />
                    <AppText variant="body" weight="700" style={styles.emptyTitle}>
                        Start the conversation
                    </AppText>
                    <AppText
                        variant="small"
                        color={COLORS.textSecondary}
                        align="center"
                        style={styles.emptyDescription}
                    >
                        There are no comments on this episode yet.
                    </AppText>
                </View>
            )}
        </View>
    );
}

function CommentItem({
    comment,
    isLast,
    styles,
}: {
    comment: PodcastComment;
    isLast: boolean;
    styles: ReturnType<typeof createStyles>;
}) {
    const author = getCommentAuthor(comment);
    const date = formatCommentDate(comment.created_at ?? comment.createdAt ?? comment.date);

    return (
        <View style={[styles.commentItem, isLast && styles.lastCommentItem]}>
            <View style={styles.commentAvatar}>
                <UserRound size={17} color={COLORS.primaryBright} />
            </View>
            <View style={styles.commentBody}>
                <View style={styles.commentMeta}>
                    <AppText variant="caption" weight="700" numberOfLines={1} style={styles.author}>
                        {author}
                    </AppText>
                    {!!date && (
                        <AppText variant="small" color={COLORS.textMuted} style={styles.date}>
                            {date}
                        </AppText>
                    )}
                </View>
                <AppText variant="small" color={COLORS.textSecondary} style={styles.commentText}>
                    {comment.comment || comment.text || ""}
                </AppText>
            </View>
        </View>
    );
}

const createStyles = () => StyleSheet.create({
    container: {
        marginTop: SPACING.xxl,
        paddingHorizontal: SPACING.xl,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.lg,
    },
    headerIcon: {
        width: 34,
        height: 34,
        marginRight: SPACING.sm,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primarySoft,
    },
    headerCopy: {
        flex: 1,
    },
    eyebrow: {
        letterSpacing: 1.1,
        marginBottom: SPACING.xxs,
    },
    countBadge: {
        minWidth: 34,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SPACING.sm,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.primarySoft,
    },
    composer: {
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.backgroundSecondary,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },
    memberRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.md,
    },

    memberCopy: {
        flex: 1,
        marginLeft: SPACING.sm,
    },
    commentInput: {
        minHeight: 100,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        fontSize: 14,
        lineHeight: 21,
    },
    composerFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SPACING.sm,
        marginBottom: SPACING.md,
    },
    reviewNote: {
        flex: 1,
        marginRight: SPACING.sm,
    },
    submitButton: {
        alignSelf: "flex-start",
        minWidth: 170,
    },
    formMessage: {
        marginTop: SPACING.md,
    },
    signInCard: {
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.xl,
        overflow: "hidden",
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primarySoft,
        borderWidth: 1,
        borderColor: COLORS.primaryBorder,
    },
    signInIcon: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.md,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.surface,
    },
    signInTitle: {
        maxWidth: 260,
    },
    signInDescription: {
        maxWidth: 280,
        marginTop: SPACING.xs,
        lineHeight: 20,
    },
    benefitList: {
        alignSelf: "stretch",
        marginTop: SPACING.lg,
        gap: SPACING.sm,
    },
    benefitRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    benefitText: {
        flex: 1,
        marginLeft: SPACING.sm,
    },
    authButton: {
        marginTop: SPACING.lg,
        overflow: "hidden",
    },
    createAccountButton: {
        marginTop: SPACING.md,
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
    },
    pressed: {
        opacity: 0.72,
    },
    authLoading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: SPACING.xl,
    },
    authLoadingText: {
        marginLeft: SPACING.sm,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        marginVertical: SPACING.xl,
        backgroundColor: COLORS.glassBorder,
    },
    commentsHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SPACING.sm,
    },
    loading: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SPACING.md,
    },
    loadingText: {
        marginLeft: SPACING.sm,
    },
    queryError: {
        alignItems: "flex-start",
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primarySoft,
    },
    queryErrorText: {
        marginBottom: SPACING.sm,
    },
    commentItem: {
        flexDirection: "row",
        paddingVertical: SPACING.lg,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.glassBorder,
    },
    lastCommentItem: {
        paddingBottom: 0,
        borderBottomWidth: 0,
    },
    commentAvatar: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SPACING.md,
        borderRadius: RADIUS.pill,
        backgroundColor: COLORS.primarySoft,
    },
    commentBody: {
        flex: 1,
    },
    commentMeta: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    author: {
        flex: 1,
        marginRight: SPACING.sm,
    },
    date: {
        flexShrink: 0,
    },
    commentText: {
        marginTop: SPACING.xs,
        lineHeight: 20,
    },
    emptyComments: {
        alignItems: "center",
        paddingVertical: SPACING.xl,
        paddingHorizontal: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.inputBackground,
    },
    emptyTitle: {
        marginTop: SPACING.sm,
    },
    emptyDescription: {
        maxWidth: 240,
        marginTop: SPACING.xs,
    },
});
