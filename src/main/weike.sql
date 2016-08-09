/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50616
Source Host           : localhost:3306
Source Database       : weike

Target Server Type    : MYSQL
Target Server Version : 50616
File Encoding         : 65001

Date: 2016-08-09 16:49:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `Answer_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `User_type` varchar(1) DEFAULT '',
  `Answer_content` varchar(300) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  `delflag` varchar(1) DEFAULT '',
  `Question_id` varchar(11) DEFAULT '',
  `User_id` varchar(11) DEFAULT '',
  PRIMARY KEY (`Answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `Course_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Course_name` varchar(50) DEFAULT '',
  `Course_describe` varchar(1200) DEFAULT '',
  `delflag` varchar(1) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  `Teacher_id` varchar(20) DEFAULT '',
  `img` varchar(150) DEFAULT '',
  PRIMARY KEY (`Course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for course_student
-- ----------------------------
DROP TABLE IF EXISTS `course_student`;
CREATE TABLE `course_student` (
  `Course_student_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Student_id` varchar(11) DEFAULT '',
  `Course_id` varchar(11) DEFAULT '',
  `delflag` varchar(1) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Course_student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for homework
-- ----------------------------
DROP TABLE IF EXISTS `homework`;
CREATE TABLE `homework` (
  `Homework_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(2000) DEFAULT '',
  `Course_id` varchar(11) DEFAULT '',
  `delflag` varchar(1) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  `Result_url` varchar(100) DEFAULT '',
  `showflag` varchar(10) DEFAULT '',
  `Homework_name` varchar(50) DEFAULT '',
  `EndDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Homework_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for material
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material` (
  `Material_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Material_type` varchar(1) DEFAULT '',
  `delflag` varchar(1) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  `url` varchar(100) DEFAULT '',
  `Course_id` varchar(11) DEFAULT '',
  `Material_name` varchar(50) DEFAULT '',
  PRIMARY KEY (`Material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `Question_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Question_name` varchar(200) DEFAULT '',
  `Question_content` varchar(300) DEFAULT '',
  `Course_id` varchar(11) DEFAULT '',
  `User_id` varchar(11) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  `delflag` varchar(1) DEFAULT '',
  PRIMARY KEY (`Question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `Student_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Student_name` varchar(20) DEFAULT '',
  `Student_pass` varchar(64) DEFAULT '',
  `classroom` varchar(20) DEFAULT '',
  `acaedemy` varchar(20) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  `delflag` varchar(1) DEFAULT '',
  `Student_no` varchar(20) DEFAULT '',
  `major` varchar(20) DEFAULT '',
  `email` varchar(20) DEFAULT '',
  `phone` varchar(20) DEFAULT '',
  `Student_sex` varchar(20) CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT '',
  PRIMARY KEY (`Student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for submit
-- ----------------------------
DROP TABLE IF EXISTS `submit`;
CREATE TABLE `submit` (
  `Submit_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Student_id` varchar(11) DEFAULT '',
  `Homework_id` varchar(11) DEFAULT '',
  `Init_url` varchar(100) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  `delflag` varchar(1) DEFAULT '',
  `score` varchar(11) DEFAULT '',
  PRIMARY KEY (`Submit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `teacher_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Teacher_name` varchar(28) DEFAULT '',
  `updatetime` timestamp NULL DEFAULT NULL,
  `delflag` varchar(2) DEFAULT '',
  `Teacher_pass` varchar(64) DEFAULT '',
  `Teacher_no` varchar(20) DEFAULT '',
  `phone` varchar(11) DEFAULT '',
  `email` varchar(20) DEFAULT '',
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
