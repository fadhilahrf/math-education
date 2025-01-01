package com.matheducation.app.domain;

import static com.matheducation.app.domain.LessonTestSamples.*;
import static com.matheducation.app.domain.MaterialTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.matheducation.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class LessonTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lesson.class);
        Lesson lesson1 = getLessonSample1();
        Lesson lesson2 = new Lesson();
        assertThat(lesson1).isNotEqualTo(lesson2);

        lesson2.setId(lesson1.getId());
        assertThat(lesson1).isEqualTo(lesson2);

        lesson2 = getLessonSample2();
        assertThat(lesson1).isNotEqualTo(lesson2);
    }

    @Test
    void materialTest() throws Exception {
        Lesson lesson = getLessonRandomSampleGenerator();
        Material materialBack = getMaterialRandomSampleGenerator();

        lesson.addMaterial(materialBack);
        assertThat(lesson.getMaterials()).containsOnly(materialBack);
        assertThat(materialBack.getLesson()).isEqualTo(lesson);

        lesson.removeMaterial(materialBack);
        assertThat(lesson.getMaterials()).doesNotContain(materialBack);
        assertThat(materialBack.getLesson()).isNull();

        lesson.materials(new HashSet<>(Set.of(materialBack)));
        assertThat(lesson.getMaterials()).containsOnly(materialBack);
        assertThat(materialBack.getLesson()).isEqualTo(lesson);

        lesson.setMaterials(new HashSet<>());
        assertThat(lesson.getMaterials()).doesNotContain(materialBack);
        assertThat(materialBack.getLesson()).isNull();
    }
}
