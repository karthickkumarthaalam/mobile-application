
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CalendarDays,
  Clock3,
  RadioTower,
  RefreshCw,
} from "lucide-react-native";

import { COLORS } from "../../../constants/colors";
import { RADIUS, SPACING } from "../../../constants/spacing";
import { ScheduledProgram } from "../../../types/radio";
import { useThemedStyles } from "../../../providers/ThemeProvider";

interface TodayScheduleProps {
  shows: ScheduledProgram[];
  currentProgramId?: number | string;
  isLoading: boolean;
  error?: string;
  onRetry: () => void;
}

const formatTime = (time: string) => time?.slice(0, 5) || "--:--";

const TodaySchedule = ({
  shows,
  currentProgramId,
  isLoading,
  error,
  onRetry,
}: TodayScheduleProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <CalendarDays size={17} color={COLORS.primary} />
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.eyebrow}>THAALAM RADIO</Text>
          <Text style={styles.title}>Today's lineup</Text>
        </View>

        {!isLoading && !error && (
          <View style={styles.countBadge}>
            <Text style={styles.count}>
              {String(shows.length).padStart(2, "0")}
            </Text>
            <Text style={styles.countLabel}>SHOWS</Text>
          </View>
        )}
      </View>

      {/* Loading */}
      {isLoading ? (
        <View style={styles.stateContainer}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.stateText}>
            Loading today's schedule...
          </Text>
        </View>
      ) : error ? (
        /* Error */
        <View style={styles.stateCard}>
          <RadioTower size={25} color={COLORS.error} />
          <Text style={styles.stateTitle}>Schedule unavailable</Text>
          <Text style={styles.stateText}>{error}</Text>

          <TouchableOpacity
            accessibilityRole="button"
            style={styles.retryButton}
            onPress={onRetry}
            activeOpacity={0.8}
          >
            <RefreshCw size={14} color={COLORS.primary} />
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : shows.length === 0 ? (
        /* Empty */
        <View style={styles.stateCard}>
          <RadioTower size={25} color={COLORS.textMuted} />
          <Text style={styles.stateTitle}>
            No programs scheduled
          </Text>
          <Text style={styles.stateText}>
            Check back later for today's broadcasts.
          </Text>
        </View>
      ) : (
        /* Timeline */
        <View style={styles.timelineContainer}>
          {shows.map((show, index) => {
            const isCurrent =
              currentProgramId != null &&
              String(show.id) === String(currentProgramId);

            const isLast = index === shows.length - 1;

            return (
              <View
                key={`${show.radioProgramId}-${show.id}-${index}`}
                style={styles.timelineRow}
              >
                {/* Time column */}
                <View style={styles.timeColumn}>
                  <Text
                    style={[
                      styles.startTime,
                      isCurrent && styles.currentStartTime,
                    ]}
                  >
                    {formatTime(show.start_time)}
                  </Text>

                  <Text style={styles.endTime}>
                    {formatTime(show.end_time)}
                  </Text>
                </View>

                {/* Timeline rail */}
                <View style={styles.rail}>
                  {!isLast && (
                    <View
                      style={[
                        styles.railLine,
                        isCurrent && styles.currentRailLine,
                      ]}
                    />
                  )}

                  <View
                    style={[
                      styles.railDotOuter,
                      isCurrent && styles.currentRailDotOuter,
                    ]}
                  >
                    <View
                      style={[
                        styles.railDot,
                        isCurrent && styles.currentRailDot,
                      ]}
                    />
                  </View>
                </View>

                {/* Program content */}
                <View
                  style={[
                    styles.programCard,
                    isCurrent && styles.currentProgramCard,
                  ]}
                >
                  {show.image_url ? (
                    <Image
                      source={{ uri: show.image_url }}
                      style={styles.artwork}
                    />
                  ) : (
                    <View style={[styles.artwork, styles.artworkFallback]}>
                      <RadioTower
                        size={20}
                        color={COLORS.textMuted}
                      />
                    </View>
                  )}

                  <View style={styles.programInfo}>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.programName,
                        isCurrent && styles.currentProgramName,
                      ]}
                    >
                      {show.category}
                    </Text>


                  </View>

                  {isCurrent && (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default TodaySchedule;

const createStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: SPACING.xxl,
      paddingHorizontal: SPACING.xl,
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: SPACING.xl,
      gap: SPACING.md,
    },
    headerIcon: {
      width: 42,
      height: 42,
      borderRadius: RADIUS.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.primarySoft,
      borderWidth: 1,
      borderColor: COLORS.primaryBorder,
    },
    headerInfo: {
      flex: 1,
      gap: 2,
    },
    eyebrow: {
      color: COLORS.textMuted,
      fontFamily: "InclusiveSans-SemiBold",
      fontSize: 9,
      letterSpacing: 1.4,
    },
    title: {
      color: COLORS.text,
      fontFamily: "InclusiveSans-Bold",
      fontSize: 21,
    },
    countBadge: {
      alignItems: "center",
      justifyContent: "center",
      minWidth: 44,
      height: 42,

    },
    count: {
      color: COLORS.text,
      fontFamily: "InclusiveSans-Bold",
      fontSize: 15,
    },
    countLabel: {
      color: COLORS.textMuted,
      fontFamily: "InclusiveSans-SemiBold",
      fontSize: 8,
      letterSpacing: 0.8,
    },

    // Timeline
    timelineContainer: {
      paddingBottom: SPACING.sm,
    },
    timelineRow: {
      flexDirection: "row",
      alignItems: "stretch",
      minHeight: 100,
    },

    // Time labels
    timeColumn: {
      width: 55,
      paddingTop: 13,
      alignItems: "flex-start",
    },
    startTime: {
      color: COLORS.text,
      fontFamily: "InclusiveSans-Bold",
      fontSize: 12,
    },
    currentStartTime: {
      color: COLORS.primary,
    },
    endTime: {
      color: COLORS.textMuted,
      fontFamily: "InclusiveSans-Regular",
      fontSize: 10,
      marginTop: 4,
    },

    // Timeline rail
    rail: {
      width: 25,
      alignItems: "center",
      position: "relative",
    },
    railLine: {
      position: "absolute",
      top: 18,
      bottom: -1,
      width: 1.5,
      backgroundColor: COLORS.glassBorder,
    },
    currentRailLine: {
      backgroundColor: COLORS.primaryBorder,
    },
    railDotOuter: {
      width: 17,
      height: 17,
      borderRadius: 9,
      marginTop: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.background,
      borderWidth: 1,
      borderColor: COLORS.glassBorder,
      zIndex: 1,
    },
    currentRailDotOuter: {
      width: 19,
      height: 19,
      borderRadius: 10,
      backgroundColor: COLORS.primarySoft,
      borderColor: COLORS.primaryBorder,
    },
    railDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: COLORS.textMuted,
    },
    currentRailDot: {
      width: 9,
      height: 9,
      borderRadius: 5,
      backgroundColor: COLORS.primary,
    },

    // Program card
    programCard: {
      flex: 1,
      minWidth: 0,
      flexDirection: "row",
      alignItems: "center",
      padding: SPACING.sm,
      marginBottom: SPACING.md,
      gap: SPACING.md,
      borderRadius: RADIUS.lg,

    },
    currentProgramCard: {
      backgroundColor: COLORS.primarySoft,
      borderColor: COLORS.primaryBorder,
    },
    artwork: {
      width: 53,
      height: 53,
      borderRadius: RADIUS.sm,
      backgroundColor: COLORS.surfaceElevated,
    },
    artworkFallback: {
      alignItems: "center",
      justifyContent: "center",
    },
    programInfo: {
      flex: 1,
      minWidth: 0,
      gap: 6,
    },
    programName: {
      color: COLORS.text,
      fontFamily: "InclusiveSans-SemiBold",
      fontSize: 13,
      lineHeight: 17,
    },
    currentProgramName: {
      color: COLORS.primary,
    },
    durationRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    durationText: {
      color: COLORS.textMuted,
      fontFamily: "InclusiveSans-Medium",
      fontSize: 10,
    },

    // Live badge
    liveBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 7,
      paddingVertical: 5,
      borderRadius: RADIUS.pill,
      backgroundColor: COLORS.primarySoft,
      borderWidth: 1,
      borderColor: COLORS.primaryBorder,
    },
    liveDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: COLORS.primary,
    },
    liveText: {
      color: COLORS.primary,
      fontFamily: "InclusiveSans-Bold",
      fontSize: 8,
      letterSpacing: 0.5,
    },

    // States
    stateContainer: {
      minHeight: 140,
      alignItems: "center",
      justifyContent: "center",
      gap: SPACING.md,
    },
    stateCard: {
      minHeight: 155,
      alignItems: "center",
      justifyContent: "center",
      padding: SPACING.xl,
      gap: SPACING.sm,
      borderRadius: RADIUS.xl,
      backgroundColor: COLORS.glass,
      borderWidth: 1,
      borderColor: COLORS.glassBorder,
    },
    stateTitle: {
      color: COLORS.text,
      fontFamily: "InclusiveSans-Bold",
      fontSize: 15,
    },
    stateText: {
      color: COLORS.textSecondary,
      fontFamily: "InclusiveSans-Regular",
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
    },
    retryButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: SPACING.sm,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      marginTop: SPACING.xs,
      borderRadius: RADIUS.pill,
      backgroundColor: COLORS.primarySoft,
    },
    retryText: {
      color: COLORS.primary,
      fontFamily: "InclusiveSans-SemiBold",
      fontSize: 12,
    },
  });
