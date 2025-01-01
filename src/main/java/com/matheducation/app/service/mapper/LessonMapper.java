package com.matheducation.app.service.mapper;

import com.matheducation.app.domain.Lesson;
import com.matheducation.app.service.dto.LessonDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Lesson} and its DTO {@link LessonDTO}.
 */
@Mapper(componentModel = "spring", uses = { MaterialMapper.class })
public interface LessonMapper extends EntityMapper<LessonDTO, Lesson> {}
