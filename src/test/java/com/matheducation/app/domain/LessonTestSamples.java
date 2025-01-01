package com.matheducation.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class LessonTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Lesson getLessonSample1() {
        return new Lesson().id(1L).title("title1").slug("slug1").description("description1").level(1);
    }

    public static Lesson getLessonSample2() {
        return new Lesson().id(2L).title("title2").slug("slug2").description("description2").level(2);
    }

    public static Lesson getLessonRandomSampleGenerator() {
        return new Lesson()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .slug(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .level(intCount.incrementAndGet());
    }
}
