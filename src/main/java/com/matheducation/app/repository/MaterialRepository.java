package com.matheducation.app.repository;

import com.matheducation.app.domain.Material;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Material entity.
 */
@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {

    Optional<Material> findOneBySlug(String slug);

    Boolean existsBySlug(String slug);
    
    default Optional<Material> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Material> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Material> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select material from Material material left join fetch material.lesson left join fetch material.parent",
        countQuery = "select count(material) from Material material"
    )
    Page<Material> findAllWithToOneRelationships(Pageable pageable);

    @Query("select material from Material material left join fetch material.lesson left join fetch material.parent")
    List<Material> findAllWithToOneRelationships();

    @Query("select material from Material material left join fetch material.lesson left join fetch material.parent where material.id =:id")
    Optional<Material> findOneWithToOneRelationships(@Param("id") Long id);
}
