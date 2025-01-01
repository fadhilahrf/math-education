package com.matheducation.app.service.mapper;

import com.matheducation.app.domain.Lesson;
import com.matheducation.app.domain.Material;
import com.matheducation.app.service.dto.LessonDTO;
import com.matheducation.app.service.dto.MaterialDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Material} and its DTO {@link MaterialDTO}.
 */
@Mapper(componentModel = "spring")
public interface MaterialMapper extends EntityMapper<MaterialDTO, Material> {
    @Mapping(target = "lesson", source = "lesson", qualifiedByName = "lessonTitle")
    MaterialDTO toDto(Material s);

    @Named("lessonTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    LessonDTO toDtoLessonTitle(Lesson lesson);
}
