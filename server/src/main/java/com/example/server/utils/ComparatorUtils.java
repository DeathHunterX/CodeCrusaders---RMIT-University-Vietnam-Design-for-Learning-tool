package com.example.server.utils;

import lombok.experimental.UtilityClass;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@UtilityClass
public class ComparatorUtils {
  public int compareModuleNames(String name1, String name2) {
    String regex = "\\d+";
    Matcher matcher1 = Pattern.compile(regex).matcher(name1);
    Matcher matcher2 = Pattern.compile(regex).matcher(name2);
    if (matcher1.find() && matcher2.find()) {
      int num1 = Integer.parseInt(matcher1.group());
      int num2 = Integer.parseInt(matcher2.group());
      int result = Integer.compare(num1, num2);

      if (result != 0) {
        return result; // Return numeric comparison result
      }
    }

    return name1.compareTo(name2); // Regular string comparison
  }
}
