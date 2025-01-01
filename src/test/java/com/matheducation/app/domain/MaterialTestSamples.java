package com.matheducation.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class MaterialTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Material getMaterialSample1() {
        return new Material().id(1L).title("title1").description("description1").content("content1").slug("slug1").orderIndex(1);
    }

    public static Material getMaterialSample2() {
        return new Material().id(2L).title("title2").description("description2").content("content2").slug("slug2").orderIndex(2);
    }

    public static Material getMaterialRandomSampleGenerator() {
        return new Material()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .content(UUID.randomUUID().toString())
            .slug(UUID.randomUUID().toString())
            .orderIndex(intCount.incrementAndGet());
    }
}
