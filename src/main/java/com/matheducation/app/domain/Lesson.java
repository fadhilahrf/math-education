package com.matheducation.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.HashSet;
import java.util.Set;

/**
 * A Lesson.
 */
@Entity
@Table(name = "lesson")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Lesson extends AbstractAuditingEntity<Long> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "description")
    private String description;

    @Column(name = "level")
    private Integer level;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "lesson")
    @JsonIgnoreProperties(value = { "lesson" }, allowSetters = true)
    private Set<Material> materials = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Lesson id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Lesson title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return this.slug;
    }

    public Lesson slug(String slug) {
        this.setSlug(slug);
        return this;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return this.description;
    }

    public Lesson description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLevel() {
        return this.level;
    }

    public Lesson level(Integer level) {
        this.setLevel(level);
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Set<Material> getMaterials() {
        return this.materials;
    }

    public void setMaterials(Set<Material> materials) {
        if (this.materials != null) {
            this.materials.forEach(i -> i.setLesson(null));
        }
        if (materials != null) {
            materials.forEach(i -> i.setLesson(this));
        }
        this.materials = materials;
    }

    public Lesson materials(Set<Material> materials) {
        this.setMaterials(materials);
        return this;
    }

    public Lesson addMaterial(Material material) {
        this.materials.add(material);
        material.setLesson(this);
        return this;
    }

    public Lesson removeMaterial(Material material) {
        this.materials.remove(material);
        material.setLesson(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lesson)) {
            return false;
        }
        return getId() != null && getId().equals(((Lesson) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Lesson{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", slug='" + getSlug() + "'" +
            ", description='" + getDescription() + "'" +
            ", level=" + getLevel() +
            "}";
    }
}
