package com.matheducation.app.domain;

import static com.matheducation.app.domain.LessonTestSamples.*;
import static com.matheducation.app.domain.MaterialTestSamples.*;
import static com.matheducation.app.domain.MaterialTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.matheducation.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class MaterialTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Material.class);
        Material material1 = getMaterialSample1();
        Material material2 = new Material();
        assertThat(material1).isNotEqualTo(material2);

        material2.setId(material1.getId());
        assertThat(material1).isEqualTo(material2);

        material2 = getMaterialSample2();
        assertThat(material1).isNotEqualTo(material2);
    }

    @Test
    void lessonTest() {
        Material material = getMaterialRandomSampleGenerator();
        Lesson lessonBack = getLessonRandomSampleGenerator();

        material.setLesson(lessonBack);
        assertThat(material.getLesson()).isEqualTo(lessonBack);

        material.lesson(null);
        assertThat(material.getLesson()).isNull();
    }

    @Test
    void parentTest() {
        Material material = getMaterialRandomSampleGenerator();
        Material materialBack = getMaterialRandomSampleGenerator();

        material.setParent(materialBack);
        assertThat(material.getParent()).isEqualTo(materialBack);

        material.parent(null);
        assertThat(material.getParent()).isNull();
    }

    @Test
    void childrenTest() {
        Material material = getMaterialRandomSampleGenerator();
        Material materialBack = getMaterialRandomSampleGenerator();

        material.addChildren(materialBack);
        assertThat(material.getChildren()).containsOnly(materialBack);
        assertThat(materialBack.getParent()).isEqualTo(material);

        material.removeChildren(materialBack);
        assertThat(material.getChildren()).doesNotContain(materialBack);
        assertThat(materialBack.getParent()).isNull();

        material.children(new HashSet<>(Set.of(materialBack)));
        assertThat(material.getChildren()).containsOnly(materialBack);
        assertThat(materialBack.getParent()).isEqualTo(material);

        material.setChildren(new HashSet<>());
        assertThat(material.getChildren()).doesNotContain(materialBack);
        assertThat(materialBack.getParent()).isNull();
    }
}
