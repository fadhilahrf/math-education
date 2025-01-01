package com.matheducation.app.web.rest;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.matheducation.app.service.MaterialService;
import com.matheducation.app.service.dto.MaterialDTO;

import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/public/materials")
public class PublicMaterialResource {
    private final Logger log = LoggerFactory.getLogger(MaterialResource.class);

    private static final String ENTITY_NAME = "material";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaterialService materialService;

    public PublicMaterialResource(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping("")
    public ResponseEntity<List<MaterialDTO>> getAllMaterials(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Materials");
        Page<MaterialDTO> page;
        if (eagerload) {
            page = materialService.findAllWithEagerRelationships(pageable);
        } else {
            page = materialService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaterialDTO> getMaterial(@PathVariable("id") Long id) {
        log.debug("REST request to get Material : {}", id);
        Optional<MaterialDTO> materialDTO = materialService.findOne(id);
        return ResponseUtil.wrapOrNotFound(materialDTO);
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<MaterialDTO> getMaterialBySlug(@PathVariable("slug") String slug) {
        log.debug("REST request to get Material by slug: {}", slug);
        Optional<MaterialDTO> materialDTO = materialService.findOneBySlug(slug);
        return ResponseUtil.wrapOrNotFound(materialDTO);
    }
}
