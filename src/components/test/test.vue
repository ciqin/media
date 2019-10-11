<template>
<div>
    <h1>Spring Boot file upload example</h1>
    <form method="POST" action="/upload/upup" enctype="multipart/form-data">
        <input type="file" name="file" /><br/><br/>
        <input type="submit" value="Submit" />
    </form>
</div>
</template>

<script>


export default {
  
};
</script>

