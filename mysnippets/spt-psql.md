
## ALTER

**This will go through all the tables in the database and updates the datatype of the columns with specific name**

```sql
DO $$
DECLARE
    rec RECORD;
BEGIN
    -- Loop through all columns named 'category' in non-system schemas
    FOR rec IN
        SELECT table_schema, table_name, column_name, data_type, character_maximum_length
        FROM information_schema.columns
        WHERE lower(column_name) = 'category'  -- Case-insensitive match
          AND table_schema NOT IN ('information_schema', 'pg_catalog')  -- Exclude system schemas
          AND table_name NOT LIKE 'pg_%'  -- Exclude tables starting with 'pg_'
    LOOP
        -- Check if the column is not already VARCHAR(20)
        IF NOT (rec.data_type = 'character varying' AND rec.character_maximum_length = 20) THEN
            -- Log the alteration
            RAISE NOTICE 'Altering table %.%: changing column % from % to VARCHAR(20)',
                rec.table_schema, rec.table_name, rec.column_name, rec.data_type;

            -- Construct and execute the ALTER TABLE statement
            EXECUTE format(
                'ALTER TABLE %I.%I ALTER COLUMN %I TYPE VARCHAR(20)',
                rec.table_schema,
                rec.table_name,
                rec.column_name
            );
        ELSE
            -- Optional: Log that no action is needed
            RAISE NOTICE 'No change needed for table %.%, column %', 
                rec.table_schema, rec.table_name, rec.column_name;
        END IF;
    END LOOP;
END;
$$;
```

**This will go through all the tables and finds a specific column name and will modify it to be a foreign key of a referenced column**

```sql
DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT table_schema, table_name
        FROM information_schema.columns
        WHERE column_name = 'category'
          AND table_schema NOT IN ('information_schema', 'pg_catalog')
    LOOP
        EXECUTE format(
            'ALTER TABLE %I.%I ADD FOREIGN KEY (category) REFERENCES public.categories(category_id)',
            rec.table_schema,
            rec.table_name
        );
    END LOOP;
END;
$$;
```