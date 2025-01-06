package com.matheducation.app.utils;

import java.text.Normalizer;

public class SlugifyUtils {

    public static String slugify(String input) {
        if (input == null || input.isEmpty()) {
            return "";
        }

        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);

        String slug = normalized.replaceAll("[^\\p{ASCII}]", "");

        slug = slug.replaceAll("[\\s+\\W]+", "-").toLowerCase();

        return slug.replaceAll("^-+|-+$", "");
    }
}
