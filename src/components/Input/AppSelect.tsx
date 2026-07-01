
import React, { useEffect, useMemo, useState } from "react";
import {
    LayoutAnimation,
    Platform,
    Pressable,
    PressableProps,
    ScrollView,
    StyleSheet,
    TextInput,
    UIManager,
    View,
} from "react-native";
import {
    Check,
    ChevronDown,
    ChevronUp,
    Search,
} from "lucide-react-native";

import AppText from "../Text/AppText";

import { COLORS } from "../../constants/colors";
import { FONT_FAMILY } from "../../constants/typography";
import { RADIUS, SPACING } from "../../constants/spacing";

interface SelectOption {
    label: string;
    value: string;
}

interface AppSelectProps extends PressableProps {
    label?: string;
    placeholder?: string;

    value?: string;

    items: SelectOption[];

    error?: string;
    disabled?: boolean;

    searchable?: boolean;

    onChange: (value: string) => void;
}

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AppSelect({
    label,
    placeholder = "Select",
    value,
    items,
    error,
    disabled = false,
    searchable = false,
    onChange,
}: AppSelectProps) {
    const [expanded, setExpanded] = useState(false);
    const [search, setSearch] = useState("");

    const selectedItem = useMemo(
        () => items.find((item) => item.value === value),
        [items, value]
    );

    const filteredItems = useMemo(() => {
        if (!searchable || !search.trim()) {
            return items;
        }

        return items.filter((item) =>
            item.label
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [items, search, searchable]);

    useEffect(() => {
        if (!expanded) {
            setSearch("");
        }
    }, [expanded]);

    const toggle = () => {
        if (disabled) return;

        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.easeInEaseOut
        );

        setExpanded((prev) => !prev);
    };

    const handleSelect = (item: SelectOption) => {
        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.easeInEaseOut
        );

        onChange(item.value);
        setExpanded(false);
    };

    return (
        <View style={styles.container}>
            {label && (
                <AppText
                    variant="caption"
                    weight="600"
                    style={styles.label}
                >
                    {label}
                </AppText>
            )}

            <Pressable
                onPress={toggle}
                style={[
                    styles.inputContainer,
                    expanded && styles.focused,
                    disabled && styles.disabled,
                    !!error && styles.errorBorder,
                ]}
            >
                <AppText
                    style={[
                        styles.value,
                        selectedItem ? {} : styles.placeholder,
                    ]}
                >
                    {selectedItem?.label ?? placeholder}
                </AppText>

                {expanded ? (
                    <ChevronUp
                        size={20}
                        color={COLORS.textSecondary}
                    />
                ) : (
                    <ChevronDown
                        size={20}
                        color={COLORS.textSecondary}
                    />
                )}
            </Pressable>

            {expanded && (
                <View style={styles.dropdown}>
                    {searchable && (
                        <View style={styles.searchContainer}>
                            <Search
                                size={18}
                                color={COLORS.textSecondary}
                            />

                            <TextInput
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Search..."
                                placeholderTextColor={
                                    COLORS.textMuted
                                }
                                style={styles.searchInput}
                            />
                        </View>
                    )}

                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        style={styles.list}
                        nestedScrollEnabled
                        showsVerticalScrollIndicator={false}
                    >
                        {filteredItems.length === 0 ? (
                            <View style={styles.empty}>
                                <AppText color={COLORS.textSecondary}>
                                    No results found
                                </AppText>
                            </View>
                        ) : (
                            filteredItems.map((item) => {
                                const active = item.value === value;

                                return (
                                    <Pressable
                                        key={item.value}
                                        onPress={() => handleSelect(item)}
                                        style={({ pressed }) => [
                                            styles.option,
                                            pressed && styles.optionPressed,
                                        ]}
                                    >
                                        <AppText
                                            weight={active ? "700" : "500"}
                                        >
                                            {item.label}
                                        </AppText>

                                        {active && (
                                            <Check
                                                size={18}
                                                color={COLORS.primary}
                                            />
                                        )}
                                    </Pressable>
                                );
                            })
                        )}
                    </ScrollView>
                </View>
            )}

            {!!error && (
                <AppText
                    variant="small"
                    color={COLORS.error}
                    style={styles.error}
                >
                    {error}
                </AppText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },

    label: {
        marginBottom: SPACING.sm,
        color: COLORS.textSecondary,
    },

    inputContainer: {
        minHeight: 56,

        paddingHorizontal: SPACING.lg,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: COLORS.inputBackground,

        borderWidth: 1,
        borderColor: COLORS.inputBorder,

        borderRadius: RADIUS.lg,
    },

    focused: {
        borderColor: COLORS.inputFocus,
        backgroundColor: COLORS.glassStrong,
    },

    disabled: {
        opacity: 0.5,
    },

    errorBorder: {
        borderColor: COLORS.error,
    },

    value: {
        flex: 1,
        fontFamily: FONT_FAMILY.regular,
        color: COLORS.text,
        fontSize: 16,
    },

    placeholder: {
        color: COLORS.textMuted,
    },

    dropdown: {
        marginTop: 6,

        maxHeight: 260,

        borderRadius: RADIUS.lg,

        overflow: "hidden",

        backgroundColor: COLORS.backgroundSecondary,

        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: SPACING.md,

        height: 48,

        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
    },

    searchInput: {
        flex: 1,

        marginLeft: SPACING.sm,

        color: COLORS.text,

        fontFamily: FONT_FAMILY.regular,

        fontSize: 15,
    },

    list: {
        maxHeight: 210,
    },

    option: {
        height: 50,

        paddingHorizontal: SPACING.lg,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    optionPressed: {
        backgroundColor: COLORS.glass,
    },

    empty: {
        paddingVertical: SPACING.xl,
        alignItems: "center",
    },

    error: {
        marginTop: 6,
    },
});

