package com.matheducation.app.service;

import com.matheducation.app.domain.Lesson;
import com.matheducation.app.repository.LessonRepository;
import com.matheducation.app.service.dto.LessonDTO;
import com.matheducation.app.service.dto.MaterialDTO;
import com.matheducation.app.service.mapper.LessonMapper;
import com.matheducation.app.utils.SlugifyUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.matheducation.app.domain.Lesson}.
 */
@Service
@Transactional
public class LessonService {

    private final Logger log = LoggerFactory.getLogger(LessonService.class);

    private final LessonRepository lessonRepository;

    private final LessonMapper lessonMapper;

    public LessonService(LessonRepository lessonRepository, LessonMapper lessonMapper) {
        this.lessonRepository = lessonRepository;
        this.lessonMapper = lessonMapper;
    }

    /**
     * Save a lesson.
     *
     * @param lessonDTO the entity to save.
     * @return the persisted entity.
     */
    public LessonDTO save(LessonDTO lessonDTO) {
        log.debug("Request to save Lesson : {}", lessonDTO);
        Lesson lesson = lessonMapper.toEntity(lessonDTO);
        lesson = lessonRepository.save(lesson);
        return lessonMapper.toDto(lesson);
    }

    /**
     * Update a lesson.
     *
     * @param lessonDTO the entity to save.
     * @return the persisted entity.
     */
    public LessonDTO update(LessonDTO lessonDTO) {
        log.debug("Request to update Lesson : {}", lessonDTO);
        Lesson lesson = lessonMapper.toEntity(lessonDTO);
        lesson = lessonRepository.save(lesson);
        return lessonMapper.toDto(lesson);
    }

    /**
     * Partially update a lesson.
     *
     * @param lessonDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LessonDTO> partialUpdate(LessonDTO lessonDTO) {
        log.debug("Request to partially update Lesson : {}", lessonDTO);

        return lessonRepository
            .findById(lessonDTO.getId())
            .map(existingLesson -> {
                lessonMapper.partialUpdate(existingLesson, lessonDTO);

                return existingLesson;
            })
            .map(lessonRepository::save)
            .map(lessonMapper::toDto);
    }

    /**
     * Get all the lessons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LessonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Lessons");
        return lessonRepository.findAll(pageable).map(lesson -> {
            LessonDTO lessonDTO = lessonMapper.toDto(lesson);
            lessonDTO.setMaterials(new ArrayList<>());

            return lessonDTO;
        });
    }

    @Transactional(readOnly = true)
    public Page<LessonDTO> findAll(Pageable pageable, Specification<Lesson> specification) {
        log.debug("Request to get all Lessons");
        return lessonRepository.findAll(specification, pageable).map(lesson -> {
            LessonDTO lessonDTO = lessonMapper.toDto(lesson);
            lessonDTO.setMaterials(new ArrayList<>());

            return lessonDTO;
        });
    }

    /**
     * Get one lesson by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LessonDTO> findOne(Long id) {
        log.debug("Request to get Lesson : {}", id);
        return lessonRepository.findById(id).map(lessonMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<LessonDTO> findOneBySlug(String slug, Boolean isForMenuView) {
        log.debug("Request to get Lesson by Slug : {}", slug);
        return lessonRepository.findOneBySlug(slug).map(lesson->{
            LessonDTO lessonDTO = lessonMapper.toDto(lesson);

            if (isForMenuView) {
                lessonDTO.getMaterials().stream().forEach(material->material.setContent(null));

                List<MaterialDTO> materialParents = lessonDTO.getMaterials().stream().filter(material -> material.getParent()==null).collect(Collectors.toList());
                materialParents.sort(Comparator.comparingInt(item->item.getOrderIndex()));
                materialParents.stream().forEach(material -> {
                    List<MaterialDTO> materialChildren = lessonDTO.getMaterials().stream().filter(child -> child.getParent()!=null && child.getParent().equals(material)).collect(Collectors.toList());
                    materialChildren.stream().forEach(child-> { 
                        child.setParent(null);
                        child.setLesson(null);
                    });
                    materialChildren.sort(Comparator.comparingInt(item->item.getOrderIndex()));
                    material.setChildren(materialChildren);
                });
                
                lessonDTO.setMaterials(materialParents);
            }
            
            return lessonDTO;
        });
    }

    public String generateSlug(String text) {
        String baseSlug = SlugifyUtils.slugify(text);
        String uniqueSlug = baseSlug;
        int counter = 1;

        while (lessonRepository.existsBySlug(uniqueSlug)) {
            uniqueSlug = baseSlug + '-' + counter;
            counter++;
        }

        return uniqueSlug;
    }

    public Boolean slugExists(String slug) {
        return lessonRepository.existsBySlug(slug);
    }

    /**
     * Delete the lesson by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Lesson : {}", id);
        lessonRepository.deleteById(id);
    }
}
