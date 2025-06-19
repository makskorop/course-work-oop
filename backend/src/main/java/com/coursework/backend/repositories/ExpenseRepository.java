package com.coursework.backend.repositories;

import com.coursework.backend.models.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Date;
import java.util.List;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
    List<Expense> findAllByUserIdOrderByDateDesc(String userId);
    List<Expense> findAllByUserIdAndDateAfterOrderByDateDesc(String userId, Date date);
}
