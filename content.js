$(document).ready(function() {
  const guidanceData = [
      {
          "field": ".awsui_heading-text_2qdw9_gej2d_327:eq(0)",
          "guidance": "Step 1: Create bucket. Here you start by creating a new S3 bucket. This will serve as a container for your data in AWS S3.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_heading-text_2qdw9_gej2d_327:eq(1)",
          "guidance": "Step 2: General configuration. This section allows you to configure general settings for your bucket.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_control_14mhv_18c4u_246:eq(0)",
          "guidance": "Step 3: Select AWS Region. Choose the region where your bucket will be created. For example, 'us-east-1' for North Virginia.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_input_2rhyz_qevde_103:eq(0)",
          "guidance": "Step 4: Bucket name. Enter a unique name for your S3 bucket. Bucket names must be globally unique. Example: 'my-unique-bucket-name'.",
          "completionCheck": function(element) { return element.val() !== ""; }
      },
      {
          "field": ".awsui_control_14mhv_18c4u_246:eq(1)",
          "guidance": "Step 5: Copy settings from existing bucket. Optionally, you can copy settings from an existing bucket.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_heading-text_2qdw9_gej2d_327:eq(2)",
          "guidance": "Step 6: Object Ownership. Configure who owns the objects uploaded to the bucket.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_heading-text_2qdw9_gej2d_327:eq(3)",
          "guidance": "Step 7: Block Public Access settings. Manage settings to block public access to your bucket.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_heading-text_2qdw9_gej2d_327:eq(4)",
          "guidance": "Step 8: Bucket Versioning. Enable or disable versioning for your bucket to keep multiple versions of an object.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_heading-text_2qdw9_gej2d_327:eq(5)",
          "guidance": "Step 9: Tags. Add tags to your bucket for better management and identification.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_heading-text_2qdw9_gej2d_327:eq(6)",
          "guidance": "Step 10: Default encryption. Set up default encryption for your bucket to automatically encrypt new objects.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_expand-button_gwq0h_cqtym_195:eq(0)",
          "guidance": "Step 11: Advanced settings. Configure advanced settings for your bucket.",
          "completionCheck": function(element) { return true; }
      },
      {
          "field": ".awsui_radio-control_1mabk_3450l_147:eq(0)",
          "guidance": "Step 12: Object Lock. Enable Object Lock to prevent objects from being deleted or overwritten for a specified period.",
          "completionCheck": function(element) { return true; }
      }
  ];

  guidanceData.forEach((item, index) => {
      const targetElement = $(item.field);
      if (targetElement.length > 0) {
          const blob = $('<div class="guidance-blob"></div>').text(item.guidance);
          blob.attr('id', `guidance-blob-${index}`);
          targetElement.after(blob);

          // Check for completion based on the provided completion check function
          targetElement.on('input change', function() {
              if (item.completionCheck($(this))) {
                  $(`#guidance-blob-${index}`).addClass('completed');
              } else {
                  $(`#guidance-blob-${index}`).removeClass('completed');
              }
          });

          // Initial check
          if (item.completionCheck(targetElement)) {
              blob.addClass('completed');
          }
      }
  });

  // CSS for the guidance blobs
  const css = `
      .guidance-blob {
          background-color: #ffeb3b;
          border: 2px solid #f57f17;
          border-radius: 5px;
          padding: 10px;
          margin-top: 10px;
          font-size: 14px;
          color: #212121;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      .guidance-blob.completed {
          background-color: #4caf50;
          border-color: #388e3c;
          color: white;
      }
  `;

  $('<style></style>').appendTo('head').html(css);
});
