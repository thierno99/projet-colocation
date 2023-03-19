package com.gocoloc.backend.service;

import java.util.List;

import com.gocoloc.backend.domain.Task;
import com.gocoloc.backend.domain.dto.TaskResponseDto;

public interface TaskService {
	public Task saveTask(Task task);
	public List<TaskResponseDto> getTasks();
	public List<TaskResponseDto> getTaskCreatedBy(String createdBy);
	public List<TaskResponseDto> getTaskAssignedTo(String asignedTo);
	public void removeTask(String taskId);
}
