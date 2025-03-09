package com.matheducation.app.service;

import com.matheducation.app.domain.Material;
import com.matheducation.app.repository.MaterialRepository;
import com.matheducation.app.service.dto.MaterialDTO;
import com.matheducation.app.service.mapper.MaterialMapper;
import com.matheducation.app.utils.SlugifyUtils;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.matheducation.app.domain.Material}.
 */
@Service
@Transactional
public class MaterialService {

    private final Logger log = LoggerFactory.getLogger(MaterialService.class);

    private final MaterialRepository materialRepository;

    private final MaterialMapper materialMapper;

    public MaterialService(MaterialRepository materialRepository, MaterialMapper materialMapper) {
        this.materialRepository = materialRepository;
        this.materialMapper = materialMapper;
    }

    /**
     * Save a material.
     *
     * @param materialDTO the entity to save.
     * @return the persisted entity.
     */
    public MaterialDTO save(MaterialDTO materialDTO) {
        log.debug("Request to save Material : {}", materialDTO);
        Material material = materialMapper.toEntity(materialDTO);
        material = materialRepository.save(material);
        return materialMapper.toDto(material);
    }

    /**
     * Update a material.
     *
     * @param materialDTO the entity to save.
     * @return the persisted entity.
     */
    public MaterialDTO update(MaterialDTO materialDTO) {
        log.debug("Request to update Material : {}", materialDTO);
        Material material = materialMapper.toEntity(materialDTO);
        material = materialRepository.save(material);
        return materialMapper.toDto(material);
    }

    /**
     * Partially update a material.
     *
     * @param materialDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<MaterialDTO> partialUpdate(MaterialDTO materialDTO) {
        log.debug("Request to partially update Material : {}", materialDTO);

        return materialRepository
            .findById(materialDTO.getId())
            .map(existingMaterial -> {
                materialMapper.partialUpdate(existingMaterial, materialDTO);

                return existingMaterial;
            })
            .map(materialRepository::save)
            .map(materialMapper::toDto);
    }

    /**
     * Get all the materials.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<MaterialDTO> findAll(Pageable pageable, Specification<Material> specification) {
        log.debug("Request to get all Materials");
        return materialRepository.findAll(specification, pageable).map(materialMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<MaterialDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Materials");
        return materialRepository.findAll(pageable).map(materialMapper::toDto);
    }

    /**
     * Get all the materials with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<MaterialDTO> findAllWithEagerRelationships(Pageable pageable) {
        return materialRepository.findAllWithEagerRelationships(pageable).map(materialMapper::toDto);
    }

    public Page<MaterialDTO> findAllWithEagerRelationships(Pageable pageable, Specification<Material> specification) {
        return materialRepository.findAll(specification, pageable).map(materialMapper::toDto);
    }

    /**
     * Get one material by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MaterialDTO> findOne(Long id) {
        log.debug("Request to get Material : {}", id);
        return materialRepository.findOneWithEagerRelationships(id).map(materialMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<MaterialDTO> findOneBySlug(String slug) {
        log.debug("Request to get Material by slug: {}", slug);
        return materialRepository.findOneBySlug(slug).map(materialMapper::toDto);
    }

    public String generateSlug(String text) {
        String baseSlug = SlugifyUtils.slugify(text);
        String uniqueSlug = baseSlug;
        int counter = 1;

        while (materialRepository.existsBySlug(uniqueSlug)) {
            uniqueSlug = baseSlug + '-' + counter;
            counter++;
        }

        return uniqueSlug;
    }

    public Boolean slugExists(String slug) {
        return materialRepository.existsBySlug(slug);
    }

    /**
     * Delete the material by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Material : {}", id);
        materialRepository.deleteById(id);
    }
}
