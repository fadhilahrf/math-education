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

import com.matheducation.app.service.LessonService;
import com.matheducation.app.service.dto.LessonDTO;

import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/public/lessons")
public class PublicLessonResource {

    private final Logger log = LoggerFactory.getLogger(LessonResource.class);

    private static final String ENTITY_NAME = "lesson";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LessonService lessonService;

    public PublicLessonResource(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("")
    public ResponseEntity<List<LessonDTO>> getAllLessons(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Lessons");
        Page<LessonDTO> page = lessonService.findAll(pageable);
        List<LessonDTO> lessons = page.getContent();

        if (!eagerload) {
            lessons.stream().forEach(lesson -> lesson.setMaterials(null));
        }

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(lessons);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonDTO> getLesson(@PathVariable("id") Long id) {
        log.debug("REST request to get Lesson : {}", id);
        Optional<LessonDTO> lessonDTO = lessonService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lessonDTO);
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<LessonDTO> getLessonBySlug(
        @PathVariable("slug") String slug,
        @RequestParam(name = "loadMaterialContent", required = false, defaultValue = "true") boolean loadMaterialContent
        ) {
        log.debug("REST request to get Lesson by Slug : {}", slug);
        Optional<LessonDTO> lessonDTO = lessonService.findOneBySlug(slug);
        
        if (!loadMaterialContent) {
            lessonDTO.get().getMaterials().stream().forEach(material->material.setContent(null));
        }

        return ResponseUtil.wrapOrNotFound(lessonDTO);
    }
}
