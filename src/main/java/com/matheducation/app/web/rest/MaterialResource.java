package com.matheducation.app.web.rest;

import com.matheducation.app.domain.Material;
import com.matheducation.app.repository.MaterialRepository;
import com.matheducation.app.service.MaterialService;
import com.matheducation.app.service.dto.MaterialDTO;
import com.matheducation.app.specification.MaterialSpecification;
import com.matheducation.app.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.matheducation.app.domain.Material}.
 */
@RestController
@RequestMapping("/api/materials")
public class MaterialResource {

    private final Logger log = LoggerFactory.getLogger(MaterialResource.class);

    private static final String ENTITY_NAME = "material";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaterialService materialService;

    private final MaterialRepository materialRepository;

    public MaterialResource(MaterialService materialService, MaterialRepository materialRepository) {
        this.materialService = materialService;
        this.materialRepository = materialRepository;
    }

    /**
     * {@code POST  /materials} : Create a new material.
     *
     * @param materialDTO the materialDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new materialDTO, or with status {@code 400 (Bad Request)} if the material has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<MaterialDTO> createMaterial(@Valid @RequestBody MaterialDTO materialDTO) throws URISyntaxException {
        log.debug("REST request to save Material : {}", materialDTO);
        if (materialDTO.getId() != null) {
            throw new BadRequestAlertException("A new material cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaterialDTO result = materialService.save(materialDTO);
        return ResponseEntity
            .created(new URI("/api/materials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /materials/:id} : Updates an existing material.
     *
     * @param id the id of the materialDTO to save.
     * @param materialDTO the materialDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialDTO,
     * or with status {@code 400 (Bad Request)} if the materialDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the materialDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MaterialDTO> updateMaterial(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MaterialDTO materialDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Material : {}, {}", id, materialDTO);
        if (materialDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materialDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MaterialDTO result = materialService.update(materialDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, materialDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /materials/:id} : Partial updates given fields of an existing material, field will ignore if it is null
     *
     * @param id the id of the materialDTO to save.
     * @param materialDTO the materialDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialDTO,
     * or with status {@code 400 (Bad Request)} if the materialDTO is not valid,
     * or with status {@code 404 (Not Found)} if the materialDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the materialDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MaterialDTO> partialUpdateMaterial(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MaterialDTO materialDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Material partially : {}, {}", id, materialDTO);
        if (materialDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materialDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MaterialDTO> result = materialService.partialUpdate(materialDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, materialDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /materials} : get all the materials.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materials in body.
     */
    @GetMapping("")
    public ResponseEntity<List<MaterialDTO>> getAllMaterials(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload,
        @RequestParam(name = "field", required = false) String field,
        @RequestParam(name = "search", required = false) String search
    ) {
        log.debug("REST request to get a page of Materials");
        Page<MaterialDTO> page;
        Specification<Material> specification = Specification.where(null);

        if (field!=null) {
            if (field.equals("title")) {
                specification = specification.and(MaterialSpecification.findByTitleContaining(search));
            }else if (field.equals("description")) {
                specification = specification.and(MaterialSpecification.findByDescriptionContaining(search));
            }else if (field.equals("content")) {
                specification = specification.and(MaterialSpecification.findByContentContaining(search));
            }
        }

        if (eagerload) {
            page = materialService.findAllWithEagerRelationships(pageable, specification);
        } else {
            page = materialService.findAll(pageable, specification);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /materials/:id} : get the "id" material.
     *
     * @param id the id of the materialDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the materialDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MaterialDTO> getMaterial(@PathVariable("id") Long id) {
        log.debug("REST request to get Material : {}", id);
        Optional<MaterialDTO> materialDTO = materialService.findOne(id);
        return ResponseUtil.wrapOrNotFound(materialDTO);
    }

    /**
     * {@code DELETE  /materials/:id} : delete the "id" material.
     *
     * @param id the id of the materialDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable("id") Long id) {
        log.debug("REST request to delete Material : {}", id);
        materialService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/generate-slug")
    public ResponseEntity<String> generateSlug(@RequestBody String text) throws URISyntaxException {
        log.debug("REST request to generate slug : {}", text);
        if (text.isBlank()) {
            throw new BadRequestAlertException("Text cannot be blank", ENTITY_NAME, "textblank");
        }
        String slug = materialService.generateSlug(text);

        return ResponseEntity.ok(slug);
    }

    @GetMapping("/check-slug-existence")
    public ResponseEntity<Boolean> slugExists(@RequestParam(name = "slug", required = true) String slug) throws URISyntaxException {
        log.debug("REST request to check slug existence : {}", slug);
        
        Boolean result = materialService.slugExists(slug);

        return ResponseEntity.ok(result);
    }
}
