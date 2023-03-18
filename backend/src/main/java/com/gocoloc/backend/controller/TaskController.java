package com.gocoloc.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gocoloc.backend.domain.Task;
import com.gocoloc.backend.domain.dto.TaskResponseDto;

@RequestMapping("/api/task")
public interface TaskController {
	
	@PostMapping("/save")
	public ResponseEntity<Task> saveTask(@RequestBody Task task);
	
	@PutMapping("/update")
	public ResponseEntity<Task> updateTask(@RequestBody Task task);
	
	@GetMapping("/get-all-task-created-by/{createdBy}")
	public ResponseEntity<List<TaskResponseDto>> getTaskCreatedBy(@PathVariable String createdBy);
	
	@GetMapping("/get")
	public ResponseEntity<List<TaskResponseDto>> getTasks();
	
	@GetMapping("/get-all-task-assigned-to/{assignedTo}")
	public ResponseEntity<List<TaskResponseDto>> getTaskAssignedTo(@PathVariable String asignedTo);
	
	@DeleteMapping("/del/{taskId}")
	public ResponseEntity<?> removeTask(@PathVariable String taskId);
}
