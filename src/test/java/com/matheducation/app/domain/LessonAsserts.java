package com.matheducation.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class LessonAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLessonAllPropertiesEquals(Lesson expected, Lesson actual) {
        assertLessonAutoGeneratedPropertiesEquals(expected, actual);
        assertLessonAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLessonAllUpdatablePropertiesEquals(Lesson expected, Lesson actual) {
        assertLessonUpdatableFieldsEquals(expected, actual);
        assertLessonUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLessonAutoGeneratedPropertiesEquals(Lesson expected, Lesson actual) {
        assertThat(expected)
            .as("Verify Lesson auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLessonUpdatableFieldsEquals(Lesson expected, Lesson actual) {
        assertThat(expected)
            .as("Verify Lesson relevant properties")
            .satisfies(e -> assertThat(e.getTitle()).as("check title").isEqualTo(actual.getTitle()))
            .satisfies(e -> assertThat(e.getSlug()).as("check slug").isEqualTo(actual.getSlug()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()))
            .satisfies(e -> assertThat(e.getLevel()).as("check level").isEqualTo(actual.getLevel()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertLessonUpdatableRelationshipsEquals(Lesson expected, Lesson actual) {
        // empty method
    }
}
