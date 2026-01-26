
## Connection

```bash
mysql -root
```

## User Management

**Create a user with all privileges
```sql
CREATE USER 'libreoffice_user'@'localhost' IDENTIFIED BY '4252';
GRANT ALL PRIVILEGES ON *.* TO 'libreoffice_user'@'localhost';
FLUSH PRIVILEGES;
```

## Table

**Create Table**

```sql
CREATE TABLE `functions` (

	`id` int(11) NOT NULL AUTO_INCREMENT,

	`name` varchar(255) NOT NULL,

	`description` text DEFAULT NULL,
	
	`strict` tinyint(1) NOT NULL DEFAULT 0,
	
	`parameters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`parameters`)),
	
	`type` enum('object','array','string','int') NOT NULL,

	`required` tinyint(1) NOT NULL DEFAULT 0,

	`status` enum('active','suspended','needs_modifications') DEFAULT 'active',

	`function_category` varchar(255) DEFAULT NULL,

	`date_created` datetime DEFAULT current_timestamp(),

	`last_updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),

	`note` text DEFAULT NULL,

PRIMARY KEY (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```


## Information Database

### show all the column names
```SQL
SELECT 
    TABLE_NAME AS table_name,
    COLUMN_NAME AS column_name
FROM 
    INFORMATION_SCHEMA.COLUMNS
WHERE 
    TABLE_SCHEMA = 'rojpt'
ORDER BY 
    TABLE_NAME, COLUMN_NAME;
```

# Table Name

