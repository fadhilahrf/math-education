package com.matheducation.app.specification;

import org.springframework.data.jpa.domain.Specification;

import com.matheducation.app.domain.Material;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;

public class MaterialSpecification {

    public static Specification<Material> findByTitleContaining(String title) {
        return (Root<Material> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            return title != null ? cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%") : null;
        };
    }

    public static Specification<Material> findByDescriptionContaining(String description) {
        return (Root<Material> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            return description != null ? cb.like(cb.lower(root.get("description")), "%" + description.toLowerCase() + "%") : null;
        };
    }

    public static Specification<Material> findByContentContaining(String content) {
        return (Root<Material> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            return content != null ? cb.like(cb.lower(root.get("content")), "%" + content.toLowerCase() + "%") : null;
        };
    }

    public static Specification<Material> findAllWithToOneRelationships() {
        return (Root<Material> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            root.fetch("lesson", JoinType.LEFT);
            root.fetch("parent", JoinType.LEFT);
            return cb.conjunction();
        };
    }
    
}
