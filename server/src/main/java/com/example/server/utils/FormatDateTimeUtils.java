package com.example.server.utils;

import lombok.experimental.UtilityClass;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@UtilityClass
public class FormatDateTimeUtils {
  public static String getIsoDateTime(LocalDateTime localDateTime) {
    return localDateTime.format(DateTimeFormatter.ISO_DATE_TIME);
  }
}
