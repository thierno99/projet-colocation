package com.gocoloc.backend.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gocoloc.backend.domain.Task;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.TaskResponseDto;
import com.gocoloc.backend.repository.TaskRepository;
import com.gocoloc.backend.service.TaskService;
import com.gocoloc.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TaskServiceImpl implements TaskService {
	@Autowired
	TaskRepository taskRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private UserService userService;

	@Override
	public Task saveTask(Task task) {
		return taskRepository.save(task);
	}

	@Override
	public List<TaskResponseDto> getTasks() {
		List<Task> tasks = taskRepository.findAll();
		if(!tasks.isEmpty() ) {
			List<TaskResponseDto>  taskResponses = new ArrayList<>();
			for(Task task: tasks) {
				TaskResponseDto taskResTmp = new TaskResponseDto();
				
				User taskOwner = userService.getUserById(task.getCreatedBy()).get();
				taskResTmp.setCreatedBy(taskOwner);
				
				Optional<User> userOpt = userService.getUserById(task.getAssignedTo());
				if(!userOpt.isEmpty()) {
					taskResTmp.setAssignedTo(userOpt.get());
				}
				
				taskResTmp.setId(task.getId());
				taskResTmp.setDescription(task.getDescription());
				taskResTmp.setPriority(task.getPriority());
				taskResTmp.setTitle(task.getTitle());
				taskResTmp.setStatus(task.getStatus());
				taskResTmp.setCreatedAt(task.getCreatedAt());
				taskResponses.add(taskResTmp);
				
			}
			return taskResponses;
		}
		return Collections.emptyList();

	}

	@Override
	public List<TaskResponseDto> getTaskCreatedBy(String createdBy) {
		Query query = new Query().addCriteria(Criteria.where("createdBy").is(createdBy));
		
		List<Task> tasks = mongoTemplate.find(query, Task.class);
		if(!tasks.isEmpty() ) {
			List<TaskResponseDto>  taskResponses = new ArrayList<>();
			for(Task task: tasks) {
				TaskResponseDto taskResTmp = new TaskResponseDto();
				
				User taskOwner = userService.getUserById(createdBy).get();
				taskResTmp.setCreatedBy(taskOwner);
				
				Optional<User> userOpt = userService.getUserById(task.getAssignedTo());
				if(!userOpt.isEmpty()) {
					taskResTmp.setAssignedTo(userOpt.get());
				}
				
				taskResTmp.setId(task.getId());
				taskResTmp.setDescription(task.getDescription());
				taskResTmp.setPriority(task.getStatus());
				taskResTmp.setTitle(task.getTitle());
				taskResTmp.setStatus(task.getStatus());
				taskResTmp.setCreatedAt(task.getCreatedAt());
				taskResponses.add(taskResTmp);
				
			}
			return taskResponses;
		}
		return Collections.emptyList();
	}

	@Override
	public List<TaskResponseDto> getTaskAssignedTo(String asignedTo) {
		Query query = new Query().addCriteria(Criteria.where("assignedTo").is(asignedTo));
		
		List<Task> tasks = mongoTemplate.find(query, Task.class);
		if(!tasks.isEmpty() ) {
			List<TaskResponseDto>  taskResponses = new ArrayList<>();
			for(Task task: tasks) {
				TaskResponseDto taskResTmp = new TaskResponseDto();
				
				User taskOwner = userService.getUserById(task.getCreatedBy()).get();
				taskResTmp.setCreatedBy(taskOwner);
				
				Optional<User> userOpt = userService.getUserById(asignedTo);
				if(!userOpt.isEmpty()) {
					taskResTmp.setAssignedTo(userOpt.get());
				}
				
				taskResTmp.setId(task.getId());
				taskResTmp.setDescription(task.getDescription());
				taskResTmp.setPriority(task.getStatus());
				taskResTmp.setTitle(task.getTitle());
				taskResTmp.setStatus(task.getStatus());
				taskResTmp.setCreatedAt(task.getCreatedAt());
				taskResponses.add(taskResTmp);
				
			}
			return taskResponses;
		}
		return Collections.emptyList();

	}

	@Override
	public void removeTask(String taskId) {
		taskRepository.deleteById(taskId);
	}

}
