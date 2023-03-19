package com.gocoloc.backend.controller.impl;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gocoloc.backend.controller.TaskController;
import com.gocoloc.backend.domain.Task;
import com.gocoloc.backend.domain.dto.TaskResponseDto;
import com.gocoloc.backend.service.TaskService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class TaskControllerImpl implements TaskController {
	
	@Autowired
	private TaskService taskService;

	@Override
	public ResponseEntity<Task> saveTask(Task task) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/task/save").toUriString());
		return ResponseEntity.created(uri).body(taskService.saveTask(task));
	}

	@Override
	public ResponseEntity<Task> updateTask(Task task) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/task/update").toUriString());
		return ResponseEntity.created(uri).body(taskService.saveTask(task));
	}
	
	@Override
	public ResponseEntity<List<TaskResponseDto>> getTasks() {
		return ResponseEntity.ok(taskService.getTasks());
	}

	@Override
	public ResponseEntity<List<TaskResponseDto>> getTaskCreatedBy(String createdBy) {
		return ResponseEntity.ok(taskService.getTaskCreatedBy(createdBy));
	}

	@Override
	public ResponseEntity<List<TaskResponseDto>> getTaskAssignedTo(String asignedTo) {
		return ResponseEntity.ok(taskService.getTaskAssignedTo(asignedTo));
	}

	@Override
	public ResponseEntity<?> removeTask(String taskId) {
		try {
			taskService.removeTask(taskId);
			return ResponseEntity.ok("supprimé avec succès !");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("echec de suppression.");
		}
	}

}
