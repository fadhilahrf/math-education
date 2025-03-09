package com.matheducation.app.specification;

import org.springframework.data.jpa.domain.Specification;

import com.matheducation.app.domain.Lesson;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public class LessonSpecification {

    public static Specification<Lesson> findByTitleContaining(String title) {
        return (Root<Lesson> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            return title != null ? cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%") : null;
        };
    }

    public static Specification<Lesson> findByDescriptionContaining(String description) {
        return (Root<Lesson> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            return description != null ? cb.like(cb.lower(root.get("description")), "%" + description.toLowerCase() + "%") : null;
        };
    }
    
}
